<template>
	<view class="container">
	

		<view class="list">
			<view class="house-item" v-for="(item, index) in items" :key="index">
				<view class="item-inner">
					<view class="cover">
						<image :src="item.imgs[0]?item.imgs[0].url:'/static/images/icon-noimg.png'" alt="" class="cover-image" />
					</view>
					<view class="info">
						<view class="name">{{ item.content }}</view>
						<view>{{ item.time }}</view>
						<view class="a_flex a_align_items a_jus_between">
							<view class="location">
								<image :src="item.user?item.user.icon:''" alt=""
									style="object-fit: cover;border-radius: 50rpx;height: 100rpx;background: #efefef;width: 30px; height: 30px;margin-right: 2rpx;" />
								<span>{{ item.user?item.user.username:"暂无信息" }}</span>

							</view>
							

							<view class="a_flex a_align_items a_jus_between">
								<view class="a_flex a_align_items a_jus_between" style="margin-right: 10rpx;">
									<u-icon @click="addNum(item)" v-if="!isHasName(item)" name="heart" color="red"
										></u-icon>

									<u-icon @click="cancleNum(item)" v-else name="heart-fill" color="red" >
									</u-icon>
									<p>{{ item.num ? item.num.length : 0 }}</p>
								</view>
								<u-icon v-if="item.user.username == username" @click="delectItem(item)" name="trash"></u-icon>
								
							
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-fixed">
			<router-link to="./day-send">
				<image src='../../static/images/icon-send.png' style="height: 80rpx;width:80rpx;"></image>
			</router-link>

		</view>
	</view>
</template>

<script>
	import {
		getStudy,
		getAdState,
		updateAdState,


		getRoom,
		getAdd,
		getCancle,
		delRoom
	} from '@/api/api';


	export default {
		data() {
			return {
				studyList: [], //课程列表
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
			this.studyList = [];
			this.getRoom();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载
		onReachBottom(e) {
			if (this.loading != 0) {
				this.more = 'loading';
				this.page += 1;
				this.getStudyList();
			} else {}
		},
		onLoad() {},
		onShow() {
			this.token = uni.getStorageSync('token');
			//获取是否看广告的状态
			// this.getState()

		},
		mounted() {

			// this.getStudyList();
			this.getRoom();
		},
		methods: {
			getRoom() {
				getRoom().then(res => {

					this.items = res.data.reverse();
					console.log(this.items)
				})
			},
			isHasName(item) {
				let num = item.num;
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
				item.num.push({
					name: this.username
				});
				getAdd(item).then(res => {
					return uni.showToast({
						title: '已点赞',
						duration: 1000,
						icon: 'success'
					});
				})
				// const res = await this.$http.put("rest/room/" + item._id, item);
			},
			cancleNum(item) {
				item.num.forEach((element, index) => {
					if (element.name == this.username) {
						item.num.splice(index, 1);
					}
				});
				getCancle(item).then(res => {
					return uni.showToast({
						title: '取消点赞',
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
							delRoom(item).then(res => {
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
	.list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.container {
		/* 确保容器占据整个页面高度 */
		// height: 80vh;
	}

	.content {
		/* 页面内容的样式 */
		height: calc(100vh - 400px);
		/* 假设底部固定元素高度为100px */
		overflow-y: auto;
		/* 允许内容滚动 */
	}

	.bottom-fixed {
		position: fixed;
		bottom: 85rpx;
		/* 距离底部的距离，根据 tabBar 的高度调整 */
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		background-color: #fff;
		z-index: 999;

	}

	.house-item {
		width: 50%;

		.item-inner {
			margin: 1.33333vw;
			background: #fff;
			border-radius: 1.6vw;
			overflow: hidden;

			.cover {
				width: 200px;
				/* 或者其他具体的宽度值 */
				height: 200px;
				/* 或者其他具体的高度值 */
				overflow: hidden;

				/* 隐藏超出容器的部分 */
				.cover-image {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}

			.info {
				padding: 8px 10px;
				color: #666;
				font-size: 12px;
			}

			.location {
				display: flex;
				align-items: center;

				img {
					width: 12px;
					height: 12px;
				}

				.text {
					margin-left: 2px;
					font-size: 12px;
					color: #666;
				}
			}

			.name {
				margin: 5px 0;
				font-size: 14px;
				color: #333;

				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.price {
				display: flex;
				align-items: flex-start;

				margin: 8px 0;

				.new {
					color: #ff9645;
					font-size: 14px;
				}

				.old {
					margin: 0 3px;
					color: #999;
					font-size: 12px;
					text-decoration: line-through;
				}

				.tip {
					background-image: linear-gradient(270deg, #f66, #ff9f9f);
					color: #fff;
					padding: 0 6px;
					border-radius: 8px;
				}
			}
		}
	}
</style>
