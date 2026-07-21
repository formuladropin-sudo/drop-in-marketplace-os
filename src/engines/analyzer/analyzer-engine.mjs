const RUBRIC = Object.freeze({ evidence: 20, clarity: 15, discovery: 15, conversion: 20, visual: 15, compliance: 10, consistency: 5 });
const finding = (code,severity,module,message,recommendation,reference) => ({code,severity,module,message,recommendation,...(reference?{reference}:{})});
export function analyzePackage(ad,strategy,copy,carousel){
  const findings=[];
  const supported=new Set(ad.claims.filter(c=>c.status==="supported").map(c=>c.id));
  const evidence=Math.round(RUBRIC.evidence*strategy.confidence/100);
  if(strategy.confidence<70)findings.push(finding("LOW_STRATEGY_CONFIDENCE","critical","decision","Strategy confidence is below 70.","Strengthen evidence before publication."));
  const clarity=copy.compliance.truncations.length?10:RUBRIC.clarity;
  if(copy.compliance.truncations.length)findings.push(finding("COPY_TRUNCATED","warning","copy","Copy contains truncated fields.","Rewrite affected fields within channel limits."));
  const discovery=Math.min(RUBRIC.discovery,5+copy.keywords_used.length*3);
  if(discovery<RUBRIC.discovery)findings.push(finding("KEYWORD_COVERAGE_LIMITED","opportunity","copy","Keyword coverage is below the rubric maximum.","Add verified, relevant search terms without repetition."));
  const coveredObjections=strategy.objections.filter(o=>o.status==="covered").length;
  const conversion=Math.min(RUBRIC.conversion,12+coveredObjections*4+(strategy.value_proposition?4:0));
  const visualCoverage=carousel.coverage.uncovered_claim_ids.length===0;
  const visual=visualCoverage?RUBRIC.visual:10;
  if(!visualCoverage)findings.push(finding("VISUAL_MESSAGE_UNCOVERED","warning","carousel","Supported messages are not represented visually.","Add or revise a benefit slide."));
  const blocker=[strategy.status,copy.compliance.status,carousel.compliance.status].includes("blocked");
  const compliance=blocker?0:[strategy.status,copy.compliance.status,carousel.compliance.status].includes("needs_review")?6:RUBRIC.compliance;
  if(blocker)findings.push(finding("PACKAGE_BLOCKED","blocker","package","At least one upstream module is blocked.","Resolve upstream blockers and re-run analysis."));
  const sameProject=copy.source.project_id===ad.project_id&&carousel.source.project_id===ad.project_id;
  const allTraceable=[...copy.bullets,copy.description].flatMap(x=>x.source_claim_ids).every(id=>supported.has(id));
  const consistency=sameProject&&allTraceable?RUBRIC.consistency:0;
  if(!sameProject||!allTraceable)findings.push(finding("PACKAGE_INCONSISTENT","blocker","package","Cross-module source or claim references are inconsistent.","Rebuild the package from one canonical project revision."));
  const dimensions=[
    ["evidence",evidence,"Strategy confidence converted to rubric weight."],["clarity",clarity,"Copy limits and truncations."],["discovery",discovery,"Relevant keywords represented in title."],
    ["conversion",conversion,"Value proposition and objection coverage."],["visual",visual,"Visual coverage of supported messages."],["compliance",compliance,"Upstream compliance states."],["consistency",consistency,"Cross-module identifiers and claim traceability."]
  ].map(([id,score,explanation])=>({id,score,max_score:RUBRIC[id],explanation}));
  const score=dimensions.reduce((sum,d)=>sum+d.score,0);
  if(!findings.length)findings.push(finding("PACKAGE_CHECKS_PASSED","passed","package","All rubric checks passed.","Proceed to marketplace adaptation."));
  const hasBlocker=findings.some(f=>f.severity==="blocker"),hasReview=findings.some(f=>["critical","warning"].includes(f.severity));
  return {schema_version:"0.6.0",contract_type:"analysis_report",report_id:`analysis:${ad.metadata.run_id}`,rubric_version:"marketplace-quality@0.6.0",source:{project_id:ad.project_id,strategy_id:strategy.strategy_id,copy_id:copy.copy_id,carousel_id:carousel.plan_id},status:hasBlocker?"blocked":hasReview?"needs_review":"approved",score,dimensions,findings,next_actions:findings.filter(f=>f.severity!=="passed").map(f=>f.recommendation)};
}