<template>
	<!-- 登录-开始页 -->
	<view class="container2">
		<view class="login_top">
			<image class="login_bg" mode="widthFix" src=""></image>
			<image class="login_logo" mode="widthFix" src="../../static/images/logo3.png"></image>
		</view>
		<view style="width: 60%;padding:10rpx 30rpx;font: 16px Tahoma,Helvetica,Arial,'宋体',sans-serif;">
			<h1>Make a new friend</h1>
			<view style="font-size: 12px;">Today is a beautiful day-宠物说</view>
		</view>
		<view class="star_btn" @click="gotoLogin">Let's Go</view>

	</view>
</template>

<script>
	export default {

		methods: {
			gotoLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		}
	};
</script>

<style lang="less">
	.container2 {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		// background-color:#ffbc00 ;

		box-sizing: border-box;


		.star_btn {
			color: white;
			margin: 0 auto;
			text-align: center;
			font: 18px Tahoma, Helvetica, Arial, '宋体', sans-serif;
			font-weight: 600;
			margin-bottom: 60rpx;
			width: 40%;
			height: 100rpx;
			line-height: 100rpx;
			background-image: linear-gradient(to bottom, #0b1d1e, #0b1d1e);
			border-radius: 50rpx;

		}

		.login_top {
			position: relative;

			.login_bg {
				width: 100%;
			}

			.login_txt {
				font-size: 60rpx;
				position: absolute;
				color: white;
				top: 100rpx;
				left: 0;
				right: 0;
				text-align: center;
			}

			.login_logo {
				width: 50%;
				height: 50%;
				position: absolute;
				bottom: -150rpx;
				left: 0;
				right: 0;
				z-index: 2;
				margin: 0 auto;
			}
		}




	}
</style>
