<template>
	<view>
		<view style="padding: 20rpx;">

			<u--form labelPosition="left" :model="model" :rules="rules" ref="uForm" labelWidth="150rpx">

				<u-form-item label="" prop="userInfo.content" ref="item1">
					<u--textarea v-model="model.userInfo.content" placeholder="这一刻的想法" border="none"></u--textarea>
				</u-form-item>



			</u--form>
			<div class="imgBox">
				<u-upload class="avatar-uploader" :fileList="fileList1" @afterRead="afterRead" @delete="deletePic"
					name="1" multiple :maxCount="10">
				</u-upload>
			</div>

		</view>


		<view class="goods-carts">
			<u-button @click="submit" type="primary" text="发布" color="#f8ae3d"></u-button>
		</view>

	</view>
</template>

<script>
	import store from '@/store/index.js'; //需要引入store
	import {
		postDaySend
	} from '@/api/api.js'
	import {
		nowTime
	} from '../../api/utils.js'
	export default {
		components: {

		},
		data() {
			return {
				// user:store.state.user,
				model: {
					userInfo: {
						content: '',
						imgs: [],
						userid: store.state.user._id,
						user: store.state.user,
						time: nowTime() //获取时间字段
					},
				},
				rules: {
					'userInfo.content': {
						type: 'string',
						required: true,
						message: '请填写内容',
						trigger: ['blur', 'change']
					}

				},
				fileList1: [],

			}
		},
		computed: {
			userStore() {
				return store.state.user;
			}
		},
		methods: {

			submit() {
				console.log(this.model.userInfo)
				postDaySend(this.model.userInfo).then(res => {
					console.log(res)
					uni.navigateBack({
						delta: 2
					});
				})
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					console.log(lists[i].url)
					// return;
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://localhost:3000/web/api/upload',
						filePath: url,
						name: 'file',
						// formData: {
						// 	user: 'test'
						// },
						success: (res) => {
							setTimeout(() => {
								this.model.userInfo.imgs.push({
									url: JSON.parse(res.data).url
								})

								resolve(res.data.url)
							}, 1000)
						}
					});
				})
			}
		}
	}
</script>


<style>
	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
		padding: 20rpx;

	}
</style>
