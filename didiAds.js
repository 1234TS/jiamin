// Surge HTTP response script converted from didiAds.js
const url = $request.url;
const body = $response.body;
if (!body) $done({});

try {
  const obj = JSON.parse(body);
  if (url.includes("/other/pGetSceneList")) {
    if (Array.isArray(obj.data?.scene_list)) {
      obj.data.scene_list = obj.data.scene_list.filter(item => item.text !== "优惠商城");
    }
    if (Array.isArray(obj.data?.show_data)) {
      obj.data.show_data.forEach(block => {
        if (Array.isArray(block.scene_ids)) block.scene_ids = block.scene_ids.filter(id => id !== "scene_coupon_mall");
      });
    }
  }
  if (url.includes("/homepage/v1/core")) {
    const keepNavIds = ["dache_anycar", "driverservice", "bike"];
    if (obj.data?.order_cards?.nav_list_card?.data) {
      obj.data.order_cards.nav_list_card.data = obj.data.order_cards.nav_list_card.data.filter(item => keepNavIds.includes(item.nav_id));
    }
    const keepBottomNavIds = ["v6x_home", "home_page", "user_center"];
    if (obj.data?.disorder_cards?.bottom_nav_list?.data) {
      obj.data.disorder_cards.bottom_nav_list.data = obj.data.disorder_cards.bottom_nav_list.data.filter(item => keepBottomNavIds.includes(item.id));
    }
  }
  if (url.includes("/ota/na/yuantu/infoList") && obj.data?.disorder_cards?.top_banner_card?.data?.[0]?.T === "yuentu_top_banner") {
    obj.data.disorder_cards.top_banner_card.data.splice(0, 1);
  }
  if (url.includes("/gulfstream/passenger-center/v2/other/pInTripLayout") && Array.isArray(obj.data?.order_components)) {
    obj.data.order_components = obj.data.order_components.filter(component => component.name !== "passenger_common_casper");
  }
  if (url.includes("/usercenter/me") && Array.isArray(obj.data?.cards)) {
    const excludedTitles = ["天天领福利", "金融服务", "更多服务", "企业服务", "安全中心"];
    obj.data.cards = obj.data.cards.filter(card => !excludedTitles.includes(card.title));
    obj.data.cards.forEach(card => {
      if (card.tag === "wallet") {
        if (Array.isArray(card.items)) card.items = card.items.filter(item => item.title === "优惠券");
        if (card.card_type === 4 && Array.isArray(card.bottom_items)) {
          card.bottom_items = card.bottom_items.filter(item => ["省钱套餐", "天天神券"].includes(item.title));
        }
      }
    });
  }
  if (url.includes("/common/v5") && Array.isArray(obj.data?.sections)) {
    obj.data.sections = obj.data.sections.filter(item => ["center_v2", "head_v2", "core_function"].includes(item.sectionId));
  }
  $done({ body: JSON.stringify(obj) });
} catch (_) {
  $done({});
}
