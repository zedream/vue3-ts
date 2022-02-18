<template>
  <div class="real-auth-wrapper">
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="110px"
      label-position="left"
      class="form">
      <div class="section">
        <common-title class="section-title">
          基础信息
          <template #tip>
            请如实填写，商家信息加密处理
          </template>
        </common-title>
      </div>
      <el-row :gutter="60">
        <el-col :span="8">
          <el-form-item prop="corpName" label="商家名称">
            <div class="corp-name">
              {{ corpName }}
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="corpType" label="企业类型">
            <el-select v-model="form.corpType" placeholder="请选择企业类型">
              <el-option
                v-for="item in CorpType"
                :key="item[0]"
                :label="item[1]"
                :value="item[0]" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="uniformCreditCode" label="统一信用代码">
            <el-input
              v-model="form.uniformCreditCode"
              placeholder="请输入统一信用代码"
              clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="8">
          <el-form-item prop="connectPerson" label="联系人">
            <el-input
              v-model="form.connectPerson"
              placeholder="请输入联系人"
              clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="connectMobile" label="联系电话">
            <el-input
              v-model="form.connectMobile"
              placeholder="请输入手机号"
              clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="email" label="电子邮箱">
            <el-input
              v-model="form.email"
              placeholder="请输入电子邮箱"
              clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="8">
          <el-form-item prop="name" label="法人姓名">
            <el-input
              v-model="form.name"
              placeholder="请输入法人姓名"
              clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="idCard" label="身份证号">
            <el-input
              v-model.number="form.idCard"
              placeholder="请输入身份证号"
              clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="registerAddress" label="注册地址">
            <el-input
              v-model="form.registerAddress"
              placeholder="请输入注册地址"
              clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="60">
        <el-col :span="24">
          <el-form-item prop="province" label="经营地址">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-select
                  v-model="form.province"
                  filterable
                  placeholder="请选择省份"
                  clearable
                  @change="provinceChange">
                  <el-option
                    v-for="item in provinceList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id + ''"
                    clearable />
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select
                  v-model="form.city"
                  filterable
                  placeholder="请选择城市"
                  clearable
                  @change="cityChange">
                  <el-option
                    v-for="item in cityList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id + ''" />
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select
                  v-model="form.district"
                  filterable
                  placeholder="请选择地区"
                  clearable>
                  <el-option
                    v-for="item in districtList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id + ''" />
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-input
                  v-model="form.businessAddress"
                  placeholder="请输入详细地址"
                  clearable />
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="section">
        <common-title class="section-title">
          账户信息
          <template #tip>
            请如实填写，方便商家及时结算平台的销售收入
          </template>
        </common-title>
        <el-row :gutter="60">
          <el-col :span="8">
            <el-form-item prop="bankCode" label="开户银行">
              <el-select
                v-model="form.bankCode"
                filterable
                placeholder="请选择开户银行"
                clearable>
                <el-option
                  v-for="item in bankList"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue.replace('\r', '')" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="branchBank" label="开户行支行">
              <el-input
                v-model.number="form.branchBank"
                placeholder="请输入开户行支行"
                clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="bankAccount" label="银行账号">
              <el-input
                v-model.number="form.bankAccount"
                placeholder="请输入银行账号"
                clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="section qualification">
        <common-title class="section-title">
          资质证照
          <template #tip>
            请如实填写，仅用于商户认证，资料不对会导致认证失败
          </template>
        </common-title>
        <el-row class="el-row-grid" :gutter="20">
          <el-col :span="4.8">
            <el-form-item class="qualification-form-item" prop="businessLicense" label="1、企业营业执照副本">
              <el-upload
                class="uploader"
                drag
                :limit="1"
                :action="action"
                :headers="header"
                :show-file-list="false"
                :on-success="(res, file) => {
                  return handleUploadSuccess('businessLicense', res, file)
                }"
                :before-upload="beforeUpload">
                <img
                  v-if="qualification.businessLicense"
                  :src="qualification.businessLicense"
                  class="image">
                <template v-else>
                  <i class="iconfont icon-upload-plus uploader-icon" />
                  <div class="uploader-tip">
                    将文件拖到此处，或
                    <span class="upload-text-btn">
                      点击上传
                    </span>
                    支持JPG、JPEG、PDF格式
                  </div>
                </template>
                <i
                  v-if="qualification.businessLicense"
                  class="iconfont icon-image-remove"
                  @click.stop="handleRemoveImage('businessLicense')" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="4.8">
            <el-form-item class="qualification-form-item" prop="idCardFront" label="2、法定代表人证件(人像面)">
              <el-upload
                class="uploader"
                drag
                :action="action"
                :headers="header"
                :show-file-list="false"
                :on-success="(res, file) => {
                  return handleUploadSuccess('idCardFront', res, file)
                }"
                :before-upload="beforeUpload">
                <img
                  v-if="qualification.idCardFront"
                  :src="qualification.idCardFront"
                  class="image">
                <template v-else>
                  <i class="iconfont icon-upload-plus uploader-icon" />
                  <div class="uploader-tip">
                    将文件拖到此处，或
                    <span class="upload-text-btn">
                      点击上传
                    </span>
                    支持JPG、JPEG、PDF格式
                  </div>
                </template>
                <i
                  v-if="qualification.idCardFront"
                  class="iconfont icon-image-remove"
                  @click.stop="handleRemoveImage('idCardFront')" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="4.8">
            <el-form-item class="qualification-form-item" prop="idCardBack" label="(国徽面)">
              <el-upload
                class="uploader"
                drag
                :action="action"
                :headers="header"
                :show-file-list="false"
                :on-success="(res, file) => {
                  return handleUploadSuccess('idCardBack', res, file)
                }"
                :before-upload="beforeUpload">
                <img
                  v-if="qualification.idCardBack"
                  :src="qualification.idCardBack"
                  class="image">
                <template v-else>
                  <i class="iconfont icon-upload-plus uploader-icon" />
                  <div class="uploader-tip">
                    将文件拖到此处，或
                    <span class="upload-text-btn">
                      点击上传
                    </span>
                    支持JPG、JPEG、PDF格式
                  </div>
                </template>
                <i
                  v-if="qualification.idCardBack"
                  class="iconfont icon-image-remove"
                  @click.stop="handleRemoveImage('idCardBack')" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="4.8">
            <el-form-item class="qualification-form-item" prop="certificateLicense" label="3、成品油批发经营许可证">
              <el-upload
                class="uploader"
                drag
                :action="action"
                :headers="header"
                :show-file-list="false"
                :on-success="(res, file) => {
                  return handleUploadSuccess('certificateLicense', res, file)
                }"
                :before-upload="beforeUpload">
                <img
                  v-if="qualification.certificateLicense"
                  :src="qualification.certificateLicense"
                  class="image">
                <template v-else>
                  <i class="iconfont icon-upload-plus uploader-icon" />
                  <div class="uploader-tip">
                    将文件拖到此处，或
                    <span class="upload-text-btn">
                      点击上传
                    </span>
                    支持JPG、JPEG、PDF格式
                  </div>
                </template>
                <i
                  v-if="qualification.certificateLicense"
                  class="iconfont icon-image-remove"
                  @click.stop="handleRemoveImage('certificateLicense')" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="4.8">
            <el-form-item class="qualification-form-item" prop="openAccountLicense" label="4、开户许可证">
              <el-upload
                class="uploader"
                drag
                :action="action"
                :headers="header"
                :show-file-list="false"
                :on-success="(res, file) => {
                  return handleUploadSuccess('openAccountLicense', res, file)
                }"
                :before-upload="beforeUpload">
                <img
                  v-if="qualification.openAccountLicense"
                  :src="qualification.openAccountLicense"
                  class="image">
                <template v-else>
                  <i class="iconfont icon-upload-plus uploader-icon" />
                  <div class="uploader-tip">
                    将文件拖到此处，或
                    <span class="upload-text-btn">
                      点击上传
                    </span>
                    支持JPG、JPEG、PDF格式
                  </div>
                </template>
                <i
                  v-if="qualification.openAccountLicense"
                  class="iconfont icon-image-remove"
                  @click.stop="handleRemoveImage('openAccountLicense')" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-grid" :gutter="20">
          <el-col v-for="(item, index) in qualification.otherLicense" :key="index" :span="4.8">
            <el-form-item class="qualification-form-item" prop="otherLicense" label="其他相关证件">
              <div class="uploader">
                <img
                  :src="item.path"
                  class="image">
                <i class="iconfont icon-image-remove" @click.stop="handleRemoveImage('otherLicense', index)" />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="4.8">
            <el-form-item class="qualification-form-item" label="其他相关证件">
              <el-upload
                class="uploader"
                drag
                :action="action"
                :headers="header"
                :show-file-list="false"
                :on-success="(res, file) => {
                  return handleUploadSuccess('otherLicense', res, file)
                }"
                :before-upload="beforeUpload">
                <template #default>
                  <i class="iconfont icon-upload-plus uploader-icon" />
                  <div class="uploader-tip">
                    将文件拖到此处，或
                    <span class="upload-text-btn">
                      点击上传
                    </span>
                    支持JPG、JPEG、PDF格式
                  </div>
                </template>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div />
    <div v-if="unDone" class="undone-tip">
      您有信息未完善，请补充
    </div>
    <div>
      <el-button
        class="submit-button"
        type="primary"
        @click="submit">
        {{ +$store.state.settled.state === 2 || $store.state.settled.paymentAuditStatus === 'REVIEW_BACK' ? '重新' : '' }}提交认证申请
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useCheckSettled } from '@/hooks'
import type { ElForm } from 'element-plus'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { useForm } from './use-form'
import { GetAllBanks, SellerJoin } from '@/api/settled'
import { CorpType } from '@/utils/constant'
import { UserTypes } from '@/store/mutation.types'
import type { UploadFile, ElFile } from 'element-plus/es/components/upload/src/upload.type'
import { GetRegions } from '@/api/common'
import Storage from '@/utils/storage'
import { StorageTypes } from '@/types/storage'
interface UploadResponse {
  data: string | null
  errorCode: string
  msg: string
}
enum PaymentAuditStatus {
  REVIEWING = '申请审核中',
  AUTHENTICITY_VERIFYING = '真实性验证中',
  REVIEW_BACK = '申请已驳回',
  AGREEMENT_SIGNING = '协议待签署',
  BUSINESS_OPENING = '业务开通中',
  COMPLETED = '申请已完成'
}
export default defineComponent({
  setup () {
    useCheckSettled()
    const store = useStore()
    const router = useRouter()
    const myForm = useForm()

    const form: SellerDetailData = myForm.form
    const rules = myForm.rules
    const qualification = myForm.qualification

    const layerVisible = ref(true)
    const unDone = ref(false)
    const action = ref(`${process.env.BASE_URL}/seller/uploadFile`)
    const header = ref({
      boTerm: 'PC',
      Authorization: `Bearer ${store.state.user.token}`,
      userid: store.state.user.uid
    })
    const bankList = ref<BankListData[]>([])
    const provinceList = myForm.provinceList
    const cityList = myForm.cityList
    const districtList = myForm.districtList

    const ruleFormRef = ref<InstanceType<typeof ElForm>>()

    const corpName = computed(() => store.state.user.corps)

    const handleUploadSuccess = (type, res: UploadResponse, file: UploadFile) => {
      // imageUrl.value = URL.createObjectURL(file.raw)
      if (res.errorCode === '00000' && res.data) {
        ElMessage.success('上传成功')
        if (type === 'otherLicense') {
          qualification.otherLicense.push({
            remark: 'otherLicense',
            path: res.data
          })
        } else {
          qualification[type] = res.data
        }
      } else {
        ElMessage.error('上传失败')
      }
    }
    const beforeUpload = (file: ElFile) => {
      const availableType = ['image/png', 'image/jpeg', 'application/pdf']
      const correct = availableType.includes(file.type)
      if (!correct) {
        ElMessage.error('不支持上传此类型文件')
      }
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isLt2M) {
      //   ElMessage.error('Avatar picture size can not exceed 2MB!')
      // }
      return correct
    }

    const handleRemoveImage = (type: string, index?: number) => {
      ElMessageBox.confirm('确认删除吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (type === 'otherLicense') {
          qualification.otherLicense.splice(index, 1)
        } else {
          qualification[type] = ''
        }
      }).catch(() => {
        console.log('取消删除')
      })
    }

    const submit = () => {
      ruleFormRef.value?.validate(valid => {
        if (valid) {
          form.qualificationDTOList = []
          Object.keys(qualification).forEach(key => {
            if (key === 'otherLicense') {
              form.qualificationDTOList.push(...qualification.otherLicense)
            } else {
              if (qualification[key]) {
                form.qualificationDTOList.push({
                  remark: key,
                  path: qualification[key]
                })
              }
            }
          })
          SellerJoin(form).then(data => {
            store.commit(`user/${UserTypes.SET_SELLER_ID}`, data)
            store.commit(`user/${UserTypes.SET_CORPS}`, form.corpName)
            Storage.Session.remove(StorageTypes.APP_STORE_SETTLED_STATE_SESSION)
            router.push('platformAudit')
          }).catch(error => {
            ElMessage.error(`入驻失败: ${error}`)
          })
        } else {
          unDone.value = true
        }
      })
    }

    const getBankList = () => {
      GetAllBanks('common_bank_dict').then(data => {
        bankList.value = data
      })
    }

    const provinceChange = (val) => {
      if (val) {
        getRegions(2, val).then(data => {
          cityList.value = data
          form.city = data[0].id.toString()
          getRegions(3, form.city).then(data => {
            districtList.value = data
            form.district = data[0].id.toString()
          })
        })
      } else {
        form.city = ''
        form.district = ''
        cityList.value = []
        districtList.value = []
      }
    }

    const cityChange = (val) => {
      if (val) {
        getRegions(3, val).then(data => {
          districtList.value = data
          form.district = data[0].id.toString()
        })
      } else {
        form.district = ''
        districtList.value = []
      }
    }

    function getRegions (level: number, pid: number | string) {
      return new Promise<RegionListData[]>((resolve, reject) => {
        GetRegions({
          level,
          pid
        }).then(data => {
          resolve(data)
        })
      })
    }

    getBankList()

    return {
      form,
      qualification,
      ruleFormRef,
      corpName,
      rules,
      layerVisible,
      action,
      header,
      CorpType,
      bankList,
      provinceList,
      cityList,
      districtList,
      unDone,
      handleUploadSuccess,
      beforeUpload,
      handleRemoveImage,
      provinceChange,
      cityChange,
      submit
    }
  }
})
</script>

<style scoped lang="scss">
.real-auth-wrapper {
  margin: 30px auto 0;
  padding-bottom: 40px;
  width: 1200px;
  .form {
    overflow: hidden; // BFC
    .section-title {
      margin-bottom: 30px;
    }
    .corp-name {
      text-align: left;
      font-size: 14px;
      color: #222222;
      font-weight: 600;
    }
    .el-select {
      width: 100%;
    }
    .qualification {
      .el-row-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
      }
      .qualification-form-item {
        display: flex;
        flex-direction: column;
        .uploader {
          width: 100%;
          height: 140px;
          position: relative;
          :deep(.el-upload) {
            width: 100%;
            height: 100%;
            .el-upload-dragger {
              border-radius: 4px;
              width: 100%;
              height: 100%;
              background: #EAECF2;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              overflow: initial;
            }
          }
          .image {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 50%;
            object-fit: cover;
            transform: translateY(-50%);
            border-radius: 4px;
          }
          .uploader-icon {
            font-size: 40px;
            line-height: 40px;
            color: #666666;
          }
          .uploader-tip {
            margin-top: 10px;
            line-height: 20px;
            font-size: 12px;
            color: #252525;
            width: 170px;
            text-align: center;
            .upload-text-btn {
              color: #FF6600;
              text-decoration: underline;
            }
          }
          .icon-image-remove {
            position: absolute;
            right: 0;
            top: -20px;
            font-size: 18px;
            color: #FF6600;
            cursor: pointer;
            transition: all 0.3s linear;
            width: 32px;
            height: 32px;
            line-height: 32px;
            &:hover {
              transform: rotate(180deg);
            }
          }
        }
      }
      :deep(.el-form-item__label) {
        width: 200px!important;
      }
    }
  }
  .undone-tip {
    font-size: 14px;
    color: #FF6600;
    margin-top: 36px;
  }
  .submit-button {
    width: 180px;
    margin-top: 25px;
  }
}
</style>
