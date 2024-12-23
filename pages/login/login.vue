<template>
	<!-- 登录 -->
	<view class="container">
		<u-icon name="arrow-left" size="40" style=" position: absolute;top: 5%;left: 5%;" @click="goBackStar"></u-icon>
		<view class="login">
			<view style="width: 60%;font: 16px Tahoma,Helvetica,Arial,'宋体',sans-serif;">
				<h1> {{type == '1' ? 'Login' : 'Sign Up'}} </h1>
			</view>
			<view class="login_input">
				<view class="input">
					<view class="input_li ">
						<view>Name</view>
						<view class="input_txt li_border flex_row"><input type="text" v-model="mobile"
								placeholder-class="ph" placeholder="" /></view>
					</view>

					<view class="input_li ">
						<view>Password</view>
						<view class="input_txt li_border flex_row">
							<input placeholder-class="ph" type="password" v-model="password" placeholder="" />
						</view>
					</view>

				</view>
			</view>
			<view class="title">
				<checkbox-group @change="changeChecked">
					<checkbox style=" transform:scale(0.7)" :checked="checked"></checkbox>
				</checkbox-group>
				<p>
					请阅读
					<text @click="open">隐私协议</text>
				</p>
			</view>
			<template v-if="type == 1">
				<view class="default_btn" @click="login">Login</view>

				<view class="forget_psd" @click="goForgotPsd">
					Sign Up
				</view>
			</template>
			<template v-else>
				<view class="default_btn" @click="goForgotPsd">
					Sign In
				</view>
				<view class="forget_psd" @click="login">Login</view>


			</template>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="dailong">
				<view class="title-name">{{ names }}</view>
				<view class="content">
					<rich-text :nodes="content"></rich-text>
				</view>
				<view class="btn">
					<view class="styleBtn" @click="clonse">取消</view>
					<view class="styleBtn showBtn" @click="goChecked">确定</view>
				</view>
			</view>
		</uni-popup>


	</view>
</template>

<script>
	import {
		getLogin,
		getSignIn,
		getCode,
		getAnnouncements
	} from '@/api/api';
	import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue';
	// import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue';
	// import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';

	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				show: true,
				time: 60,
				mobile: '', //手机号
				password: '', //密码
				code: '',
				cid: '',
				wxCode: '',
				checked: false,
				content: '', //隐私协议
				names: '隐私协议',
				showLogin: true, //登录方式选择
				type: 1, // 1登录 2注册

			};
		},
		onLoad() {
			// this.cid = plus.push.getClientInfo().clientid;
		},

		//倒计时
		computed: {
			msg() {
				if (this.time >= 60) {
					return '获取验证码';
				} else {
					return '剩余' + this.time + '秒';
				}
			}
		},
		mounted() {
			this.getProtocolList();
		},
		methods: {
			goBackStar() {
				// 在C页面内 navigateBack，将返回A页面
				uni.navigateBack({
					delta: 2
				});
			},

			//验证码登录
			changeLogin() {
				this.showLogin = true;
			},
			//密码登录
			changePsd() {
				this.showLogin = false;
			},
			//关闭弹框
			clonse() {
				this.$refs.popup.close();
			},
			//确认阅读
			goChecked() {
				this.$refs.popup.close();
				this.checked = true;
			},
			//获取隐私协议
			getProtocolList() {
				getAnnouncements().then(res => {
					console.log(res.data)
					this.content = res.data
				});
			},
			open() {
				this.$refs.popup.open();
			},
			//登录选择切换
			changeChecked(e) {
				this.checked = !this.checked;
			},
			//登录
			login() {
				if (this.type == 2) {
					return this.type = 1
				}
				if (!this.checked) {
					uni.showToast({
						title: '请阅读隐私协议',
						duration: 2000,
						icon: 'none'
					});
					return;
				}

				let data = {
					username: this.mobile,
					password: this.password,
					userType: "webUser",
				};
				console.log(data, '登录传参');
				// return;
				getLogin(data).then(res => {
					console.log(res, '登录');
					uni.setStorageSync("token", res.token);
					sessionStorage.setItem("username", this.mobile);
					sessionStorage.setItem(
						"usermessage",
						JSON.stringify(res.usermessage)
					);
					uni.reLaunch({
						url: '../index/index'
					});

				});
			},
			// 注册
			goForgotPsd() {
				if (this.type == 1) {
					return this.type = 2
				}
				if (!this.checked) {
					uni.showToast({
						title: '请阅读隐私协议',
						duration: 2000,
						icon: 'none'
					});
					return;
				}

				let data = {
					username: this.mobile,
					password: this.password,
					userType: "webUser",
				};
				//注册
				getSignIn(data).then(res => {
					sessionStorage.setItem("username", this.mobile);
					uni.reLaunch({
						url: '../index/index'
					});

				});

			},

			//倒计时
			timeCount() {
				var that = this;
				if (that.time > 1) {
					that.time--;
					setTimeout(function() {
						that.timeCount();
					}, 1000);
				} else {
					that.time = 60;
				}
			},
			//倒计时结束获取验证码
			timeClick() {
				if (this.time < 60) {
					return false;
				}
				this.getSms();
			},
			//获取验证码
			getSms() {
				var that = this;
				if (that.utils.phonePartern(that.mobile)) {
					uni.showToast({
						title: '请输入正确的手机号',
						duration: 2000,
						icon: 'none'
					});
					return;
				}
				getCode(that.mobile).then(res => {
					console.log(res, 9999);
					if (res && res.code == 0) {
						uni.showToast({
							title: '已发送',
							icon: 'none',
							duration: 2000
						});
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
				this.timeCount();
			}
		}
	};
</script>

<style lang="less">
	.container {
		font: 16px Tahoma, Helvetica, Arial, '宋体', sans-serif;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 60rpx;
		width: 100%;



		/deep/.uni-popup__wrapper {
			width: 80%;
		}

		.content {
			padding: 30rpx;
			display: flex;
			align-items: center;
			text-indent: 2em;
		}

		.dailong {
			background-color: #ffffff;
			width: 100%;
			border-radius: 30upx;
			height: 60vh;
			font-size: 28upx;

			.title-name {
				width: 100%;
				height: 10%;
				font-size: 32upx;
				font-weight: 700;
				display: flex;
				justify-content: center;
				align-items: center;
				border-bottom: 1upx solid #f6f6f6;
			}

			.content {
				width: 100%;
				height: 80%;

				box-sizing: border-box;
				overflow-y: auto;
			}

			.btn {
				width: 100%;
				height: 10%;
				display: flex;

				.styleBtn {
					display: flex;
					align-items: center;
					width: 50%;
					height: 100%;
					justify-content: center;
					color: #045ad6;
					border-top: 1upx solid #045ad6;
				}

				.showBtn {
					border-top: 1upx solid transparent;
					color: #ffffff;
					background-color: #045ad6;
					border-radius: 0 0 30upx 0;
				}
			}
		}

		.title {
			// height: 20vh;
			display: flex;
			justify-items: left;
			align-items: center;
			font-size: 28rpx;
			padding: 30rpx 0;

			text {
				color: #ffbc00;
			}
		}

		.login {
			.change_login {
				width: 100%;
				margin-top: 80rpx;
				// text-align: center;
				height: 30upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30upx;

				.textColor {
					color: #045ad6;
				}

				.line {
					// height: 26upx;
					// display: inline-block;
					// border-left:1upx solid #000000 ;
					margin: 0 40upx;
				}
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
					width: 160rpx;
					height: 160rpx;
					position: absolute;
					bottom: -80rpx;
					left: 0;
					right: 0;
					z-index: 2;
					margin: 0 auto;
				}
			}

			.login_input {
				margin-top: 120rpx;

				.input {

					box-sizing: border-box;

					// height: 300rpx;
					// background: #F4F4F4;
					.login_mode {
						margin-top: 30rpx;
						font-size: 24rpx;
						justify-content: flex-end;
					}
				}

				.input_li {
					align-items: center;
					margin-top: 40rpx;

					image {
						width: 34rpx;
						height: 34rpx;
					}

					.input_txt {
						font-size: 12px;
						flex: 1;
						align-items: center;
						justify-content: center;
						height: 80rpx;
						box-sizing: border-box;
						justify-content: space-between;

					}
				}

			}

			.forget_psd {
				text-align: center;
				font-size: 28rpx;
				line-height: 30rpx;
				font-weight: bolder;
			}

			.default_btn {
				color: white;
				margin: 0 auto;
				text-align: center;
				font: 18px Tahoma, Helvetica, Arial, '宋体', sans-serif;
				font-weight: 600;
				margin-bottom: 50rpx;
				margin-top: 50rpx;
				width: 40%;
				height: 100rpx;
				line-height: 100rpx;
				background-image: linear-gradient(to bottom, #0b1d1e, #0b1d1e);
				border-radius: 50rpx;
			}

			.other_login {
				position: absolute;
				bottom: 30rpx;
				left: 0;
				right: 0;
				margin: 0 auto;
				align-items: center;
				z-index: 0;

				.other_txt {
					align-items: center;
					font-size: 24rpx;
					color: #999999;

					.txt {
						margin: 0 30rpx;
					}

					.line {
						width: 160rpx;
					}
				}

				.wx_login {
					width: 48rpx;
					height: 48rpx;
					// margin-top: 20rpx;
				}
			}
		}

		.other_box {
			margin-top: 20rpx;
			width: 100%;
			align-items: center;
			justify-content: center;
		}

		.sign-in-with-apple {

			border: 1rpx solid #333333;
			font-size: 24rpx;
			text-align: center;
			border-radius: 6rpx;
			margin-left: 30rpx;
		}
	}
</style>
