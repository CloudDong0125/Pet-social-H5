<template>
	<view>
		<view style="padding: 20rpx;">
			<u--form labelPosition="left" :model="model" :rules="rules" ref="uForm" labelWidth="150rpx">
				<u-form-item label="发布类型" prop="userInfo.type" borderBottom ref="item1">
					<u-radio-group v-model="model.userInfo.type" placement="row">
						<u-radio activeColor="#f8ae3d" :customStyle="{padding: '0 8rpx 0 0'}"
							v-for="(item, index) in radiolist1" :key="index" :label="item.name" :name="item.type"
							@change="radioChange">
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item v-if="model.userInfo.type == 2" label="小宠名字" prop="userInfo.petname" borderBottom
					ref="item1">
					<u--input v-model="model.userInfo.petname" placeholder="请输入名字" border="none" clearable></u--input>
				</u-form-item>
				<u-form-item label="小宠品种" prop="userInfo.pettype" borderBottom ref="item1">
					<u--input v-model="model.userInfo.pettype" placeholder="请输入品种" border="none" clearable></u--input>
				</u-form-item>
				<u-form-item label="小宠详情" prop="userInfo.detail" borderBottom ref="item1">
					<u--textarea v-model="model.userInfo.detail" placeholder="请输入内容" border="none" count></u--textarea>
				</u-form-item>
				<!-- <u-form-item label="" prop="userInfo.name" ref="item1" v-if="model.type == 2">
					<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
						:maxCount="10"></u-upload>
				</u-form-item> -->
			</u--form>

			<div class="imgBox" v-if="model.userInfo.type == 2">
				<u-upload class="avatar-uploader" :fileList="fileList1" @afterRead="afterRead" @delete="deletePic"
					name="1" multiple :maxCount="10">
				</u-upload>
			</div>


		</view>




		<view class="goods-carts">

			<u-button  @click="submit" type="primary" text="发布日常" color="#f8ae3d"></u-button>


		</view>

	</view>
</template>

<script>
	import store from '@/store/index.js'; //需要引入store
	import {
		postFindSend
	} from '@/api/api.js'
	import {
		nowTime
	} from '../../api/utils.js'
	export default {

		data() {
			return {
				model: {
					userInfo: {
						type:'1',
						petname:'',
						pettype:'',
						detail: '',
						imgs: [],
						userid: store.state.user._id,
						user: store.state.user,
						time: nowTime() //获取时间字段
					},
				},
				radiolist1: [{
						type: '1',
						name: '领养',
						disabled: false
					},
					{
						type: '2',
						name: '送养',
						disabled: false
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				radiovalue1: '1',
				
				rules: {
					'userInfo.name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},

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
				postFindSend(this.model.userInfo).then(res => {
					console.log(res)
					uni.navigateBack({
						delta: 2
					});
				})
			},
			groupChange(e) {
				console.log(e)
			},
			radioChange(e) {
				console.log(e)
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
