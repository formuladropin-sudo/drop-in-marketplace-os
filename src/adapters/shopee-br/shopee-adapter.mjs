const cut=(text,max)=>text.length<=max?text:`${text.slice(0,max-1).trim()}…`;
export function adaptShopeeBr(ad,copy,carousel,analysis,profile){
  if(ad.marketplace.channel!=="shopee"||ad.marketplace.country!=="BR")throw new Error("ADAPTER_CHANNEL_MISMATCH");
  if(analysis.status==="blocked")throw new Error("ADAPTER_ANALYSIS_BLOCKED");
  if(!profile?.version||profile.channel!=="shopee"||profile.country!=="BR")throw new Error("ADAPTER_POLICY_PROFILE_INVALID");
  const warnings=[];const title=cut(copy.title.text,profile.limits.title_max_chars);if(title!==copy.title.text)warnings.push("TITLE_TRUNCATED");
  const description=cut(copy.description.text,profile.limits.description_max_chars);if(description!==copy.description.text)warnings.push("DESCRIPTION_TRUNCATED");
  if(carousel.slides.length>profile.limits.image_max_count)warnings.push("IMAGE_COUNT_TRUNCATED");
  const variants=ad.product.variants.map(v=>({seller_sku:v.sku,attributes:v.attributes,stock:v.stock_quantity??null,availability:v.availability}));
  return {schema_version:"0.7.0",contract_type:"marketplace_export",channel:"shopee",country:"BR",policy_profile_version:profile.version,source:{project_id:ad.project_id,analysis_id:analysis.report_id},listing:{title,description,category_id:ad.marketplace.category_id??null,price:ad.offer.price,attributes:ad.product.attributes,variants,images:carousel.slides.slice(0,profile.limits.image_max_count).map(s=>({position:s.position,role:s.role,specification:s}))},status:warnings.length||analysis.status==="needs_review"?"needs_review":"ready",warnings};
}