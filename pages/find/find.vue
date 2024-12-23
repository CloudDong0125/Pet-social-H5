<template>
	<view class="">
		<div class="sendBtn">
			<router-link to="./find-send">
				<img src="../../static/images/send.png" height="15" />
				
			</router-link>
		</div>
		<u-tabs @click="clickTabs" :list="list1" lineColor="#fb9d00" :activeStyle="{
		            color: '#303133',
		            fontWeight: 'bold',
					
		            transform: 'scale(1.1)'
		        }" :inactiveStyle="{
		            color: '#606266',
				
		            transform: 'scale(1)'
		        }" itemStyle="padding-left: 40rpx; padding-right: 15px; height: 60rpx;">
		</u-tabs>

		<view class="">
			<view style="padding: 20rpx;">
				<view v-for="(item,index) in items" :key="index"
					class="a_flex a_align_items_star  a_border_radius20 a_mar_bottom20"
					style="padding: 15rpx;border: 1px solid #efefef;position: relative;">
					<view class="cover" style="border-radius: 20rpx;">
						<image :src="item.imgs[0]?item.imgs[0].url:'../../static/images/icon-none.jpg'" alt=""
							class="a_cover_image" style="border-radius: 20rpx;" />
					</view>
					
					<view style="padding-left: 20rpx;height: 200rpx;width: 70%;" class="a_flex a_flex_col a_jus_between">
						<view class="a_flex a_align_items">
							<view style="margin-right: 10rpx;">
								<u-tag size="mini" text="送养" v-if="item.type == 2" ></u-tag>
								<u-tag size="mini" text="领养" type="warning" v-else></u-tag>
							</view>
							<view style="font-size: 32rpx;font-weight: bolder;">{{item.petname}}</view>

						</view>
						<view>
							<h6>种类：{{item.pettype}}</h6>
							<view style="color: #606266;">描述：{{item.detail}}</view>
						</view>

						<view class="a_flex" style="color: #666;font-size: 24rpx;">
							<view style="margin-right: 10rpx;">{{item.user.username}} </view>
							<view> {{item.time}}</view>
						</view>
					</view>




					<view class="a_flex a_align_items a_jus_between" style="position: absolute;
    right: 3%;">
						<view class="a_flex a_align_items a_jus_between" style="margin-right: 10rpx;">
							<u-icon @click="addNum(item)" v-if="!isHasName(item)" name="heart" color="red">
							</u-icon>

							<u-icon @click="cancleNum(item)" v-else name="heart-fill" color="red" >
							</u-icon>
							<p>{{ item.want ? item.want.length : 0 }}</p>
						</view>
						<u-icon v-if="item.user.username == username" @click="delectItem(item)" name="trash">
						</u-icon>

					</view>

				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		getNews,
		getBuy,
		putAddBuy,
		putCancleBuy,
		delBuy
	} from '@/api/api';
	export default {
		data() {
			return {
				dotStyle: {
					backgroundColor: 'rgba(255, 197, 0)',
					border: '1px rgba(255, 197, 0) solid',
					color: '#fff',
					selectedBackgroundColor: '#fb9d00',
					selectedBorder: '1px rgba(255, 197, 0) solid'
				},
				list1: [{
					name: '全部',
				}, {
					name: '领养',
				}, {
					name: '寄养'
				}],
				type:'',
				more: 'loading',
				loading: 0,
				token: '',
				page: 1,
				limit: 10,

				items: [],
				username: sessionStorage.getItem("username"),
				content: "",
				user: sessionStorage.getItem("usermessage") ?
					JSON.parse(sessionStorage.getItem("usermessage")) : {},
				id: this.$route.params.id,
			};
		},
		//下拉刷新
		onPullDownRefresh() {
			this.more = 'loading';
			this.loading = 0;
			this.page = 1;
			this.newsList = []
			this.getBuy();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);

		},
		//上拉加载
		onReachBottom(e) {
			if (this.loading != 0) {
				this.more = 'loading';
				this.page += 1;
				this.getBuy();
			} else {

			}
		},
		onShow() {
			this.token = uni.getStorageSync('token');
		},
		mounted() {
			this.getBuy();
		},
		methods: {
			clickTabs(item) {
				if (item.index == 0) {
					this.type = '';
				} else {
					this.type = item.index
				}
				
				this.getBuy();
				console.log(item.index)
			},
			getBuy() {
				getBuy(this.type).then(res => {

					this.items = res.data.reverse();
					console.log(this.items)
				})
			},
			putBuy(item) {
				putBuy(item).then(res => {
					return uni.showToast({
						title: '已取消',
						duration: 1000,
						icon: 'none'
					});
				})
			},
			isHasName(item) {
				let num = item.want;
				console.log(item)
				let filterList = num.filter((filt) => {
					return filt.name == this.username;
				});
				if (filterList.length > 0) {
					return true;
				} else {
					return false;
				}
			},
			addNum(item) {
				item.want.push({
					name: this.username
				});
				putAddBuy(item).then(res => {
					return uni.showToast({
						title: '喜爱',
						duration: 1000,
						icon: 'success'
					});
				})
				// const res = await this.$http.put("rest/room/" + item._id, item);
			},
			cancleNum(item) {
				item.want.forEach((element, index) => {
					if (element.name == this.username) {
						item.want.splice(index, 1);
					}
				});
				putCancleBuy(item).then(res => {
					return uni.showToast({
						title: '已取消',
						duration: 1000,
						icon: 'none'
					});
				})
				// const res = await this.$http.put("rest/room/" + item._id, item);

			},
			delectItem(item) {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确定删除吗？',
					confirmColor: '#fb9d01',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							delBuy(item).then(res => {
								that.getRoom();
								return uni.showToast({
									title: '删除成功',
									duration: 1000,
									icon: 'none'
								});
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	};
</script>

<style lang="less">
	.cover {
		width: 200rpx;
		/* 或者其他具体的宽度值 */
		height: 200rpx;
		/* 或者其他具体的高度值 */
		overflow: hidden;
		border: 1rpx solid beige;
		// background-color: antiquewhite;

	}

	.sendBtn {
		width: 70rpx;
		height: 70rpx;
		border-radius: 100%;
		background-color: #fb9d01;
		position: fixed;
		/* margin-top: 40px; */
		right: 5%;
		z-index: 99;

		display: flex;
		/*固定 */
		align-items: center;
		justify-content: center;
		bottom: 10%;
	}
</style>
