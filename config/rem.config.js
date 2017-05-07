/* rem 计算规则
 * rootFontSize = clientWidth * remUnit / remWidth
 * remUnit 当屏幕为remWidth的时候，1rem代表的px值
 * remWidth rem基准宽度
 * remPrecision 小数点精确值
 * 最大宽度参照 https://www.hitoy.org/pixels-width-issues-in-smart-devices.html
 */
module.exports = {
	remUnit: 75,
  remWidth: 375,
  remPrecision: 2,
  maxWidth: 450
}
