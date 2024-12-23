<template>
	<view class="container">

		<view class="index" style="padding:20rpx 30rpx;">
			<view class="head a_flex a_align_items flex_row">
				<!--根据id到Type页面-->
				<view class="left flex_row" @click="openType">
					<image class="change_icon" src="../../static/images/change_icon.png"></image>
				</view>

				<image @click="openNotice" class="notice_icon"
					:src="user.icon?user.icon:'../../static/images/tabbarImg/space_active1.png'"></image>
			</view>
			<view class="bg">
				Show the style of your pet
			</view>
		</view>

		<uni-swiper-dot :info="adsType" :current="current" field="content" :mode="mode" name="1" autoplay="true"
			:dots-styles="dotStyle">
			<swiper class="swiper-box" @change="change">
				<swiper-item v-for="(item ,index) in adsType" :key="index">
					<image class="swiper-image" :src="item.image"></image>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>

		<u-divider text="pet"></u-divider>

		<view class="card bg-white p-3 " style="font-size: 28rpx;">
			<view class="nav-icons bg-white-1 mt-3 d-flex flex-wrap text-center pt-3">
				<view class="nav-item mb-3" v-for="item in petTypes" :key="item._id">
					<img @click="clickDetail(item)" class="petImg" :src="item.icon"></img>
					<view class="py-1 fs-md">{{item.name}}</view>
				</view>
			</view>
		</view>

		<u-divider text="pet"></u-divider>

		<u-tabs @click="clickTabs" :list="list1" lineColor="#fb9d00" :activeStyle="{
		            color: '#303133',
		            fontWeight: 'bold',
				
		            transform: 'scale(1.1)'
		        }" :inactiveStyle="{
		            color: '#606266',
				
		            transform: 'scale(1)'
		        }" itemStyle="padding-left: 40rpx; padding-right: 15px; height: 60rpx;">
		</u-tabs>


		<uni-swiper-dot :info="newTypes" :current="current" field="content" mode="dot">
			<swiper class="swiper-box" @change="change" style="padding: 10px;
    font-size: 30rpx;">
				<swiper-item v-for="(item ,index) in newTypes" :key="index">
					<router-link tag="div" :to="`/homedetail/${news._id}`" class="py-1 fs-md d-flex"
						v-for="(news, index) in item.newsList" :key="index">
						<span class="text-blue-1" style="font-weight: bolder;">【{{ news.CategoryName }}】</span>
						<span class="px-2" style="margin: 0 10rpx;"> | </span>
						<span class="flex-1 fs-md pr-1 text-ellipsis" style="margin: 0 10rpx;">{{ news.title }}</span>
						<span class="text-grey fs-sm"
							style="font-size: 24rpx;color: #aaaeb7;">{{ news.createdAt | date }}</span>
					</router-link>

				</swiper-item>
			</swiper>
		</uni-swiper-dot>

	</view>
</template>

<script>
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'; //1.导入组件

	const {
		getIndex,
		getCourseName,
		getVersion,
		swiperId,
		getNoticeCount,


		getItems,
		getAds,
		getNewsList
	} = require('../../api/api.js');

	export default {
		components: {


			uniSwiperDot
		},
		data() {
			return {
				user: sessionStorage.getItem("usermessage") ?
					JSON.parse(sessionStorage.getItem("usermessage")) : {},
				petTypes: [],
				adsType: [],
				newTypes: [],

				current: 0,
				mode: 'round',

				dotStyle: {
					backgroundColor: 'rgba(255, 197, 0)',
					border: '1px rgba(255, 197, 0) solid',
					color: '#fff',
					selectedBackgroundColor: '#fb9d00',
					selectedBorder: '1px rgba(255, 197, 0) solid'
				},
				list1: [{
					name: '热门',
				}, {
					name: '新闻',
				}, {
					name: '公告'
				}],
				type: '',
				newTypesOld: []

			};
		},
		onShow() {

		},
		onLoad(options) {

		},
		mounted() {
			this.getAds();
			this.getItems();
			this.getNewsList();
		},
		methods: {

			getAds() {
				getAds().then(res => {
					console.log(res)
					this.adsType = res.data[0].items;
					console.log(this.adsType);
				})
			},
			// 小宠之星
			getItems() {
				getItems().then(res => {
					this.petTypes = res.data //reverse()按照最新的发显示
					console.log(this.petTypes);
				})
			},
			clickTabs(item) {

				this.type = item.index

				var arr = this.newTypesOld;
				let obj = arr[this.type]
				this.newTypes = obj ? [obj] : [];
				console.log(this.newTypes)
			},
			getNewsList() {
				getNewsList().then(res => {
					this.newTypesOld = res.data;
					this.newTypes = this.newTypesOld
					console.log(this.newTypes);
				})
			},
			change(e) {
				this.current = e.detail.current;
			},
			click(item) {
				console.log('item', item);
			}

		}
	};
</script>

<style lang="less">
	.swiper-image {
		width: 100%;
		/* 图片宽度占满容器 */
		height: 100%;
		/* 图片高度占满容器 */
		object-fit: cover;
		/* 保持图片比例并填充容器 */
	}

	.bg {
		font: 50rpx Tahoma, Helvetica, Arial, '宋体', sans-serif;
		width: 72%;
		padding: 30rpx 0rpx;
		font-weight: bolder;
	}

	//热门宠物
	.nav-icons {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-wrap: nowrap;
		/* 防止换行 */
		overflow-x: auto;
		/* 超出轴时滚动 */
		-webkit-overflow-scrolling: touch;
		/* 平滑滚动效果（适用于移动设备） */
		gap: 1rem;
		/* 左右间距一致 */
		padding: 0 1rem;
		/* 左右内边距一致 */

		.nav-item {
			// width: 20%;	
			text-align: center;
			flex: 0 0 auto;
			/* 防止项目伸缩 */

			.petImg {
				object-fit: cover;
				/* 保持图片比例并填充容器 */
				width: 100rpx;
				border-radius: 50rpx;
				height: 100rpx;
				background: #efefef;

			}
		}

	}

	.index_title {
		display: flex;
		padding-left: 30rpx;

		.icon {
			margin-top: 6rpx;
			width: 10rpx;
			height: 30rpx;
			border-radius: 5rpx;
			background-color: #045ad6;
		}

		.text {
			margin-left: 20rpx;
			color: #000000;
			font-size: 32rpx;
			font-weight: bold;
		}
	}

	.head {
		position: relative;
		color: white;
		padding: 30rpx 0rpx;
		font-size: 30rpx;
		align-items: center;
		justify-content: space-between;

		.noticeNum {
			position: absolute;
			top: 15%;
			right: 4%;
			width: 30rpx;
			height: 30rpx;
			text-align: center;
			line-height: 30rpx;
			border-radius: 50%;
			background-color: red;
			color: #FFFFFF;
			font-size: 18rpx;
		}

		.left {
			align-items: center;

			.change_icon {
				width: 32rpx;
				height: 32rpx;
				margin-left: 20rpx;
			}
		}

		.notice_icon {
			width: 60rpx;
			height: 60rpx;
			object-fit: cover;

			border-radius: 50rpx;

			background: #efefef;
			// margin-right: 20rpx;
		}
	}



	.swiper1 {
		height: 350rpx;
		width: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;
		margin: 0 auto;
		margin-top: -80rpx;
		border-radius: 20rpx;
		padding-bottom: 20rpx;

		swiper-item {
			border-radius: 20rpx;
		}

		image {
			width: 100%;
			border-radius: 20rpx;
		}
	}

	.tab_list {
		flex-wrap: wrap;
		padding: 20rpx;
		padding-bottom: 0;
		justify-content: space-between;

		image {
			width: 342rpx;
			margin-bottom: 20rpx;
		}
	}
</style>
