<template>
  <div class="view-container">
    <div class="is-certified-icon" :class="[form.status === 1 ? 'certified-icon' : 'not-certified-icon']" />
    <el-form
      ref="ruleFormRef"
      :model="form"
      label-position="left"
      label-width="110px"
      class="login-form">
      <common-title class="view-title">
        基础信息
      </common-title>
      <el-row>
        <el-col :span="8">
          <el-form-item label="公司名称：">
            <span>{{ form.corpName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="公司类型：">
            <span>{{ corpTypeName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="统一信用代码：">
            <span>{{ form.uniformCreditCode }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="联系人：">
            <span>{{ form.connectPerson }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话：">
            <span>{{ form.connectMobile }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电子邮箱：">
            <span>{{ form.email }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="法人姓名：">
            <span>{{ form.name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号：">
            <span>{{ form.idCard }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8" />
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="注册地址：">
            <span>{{ form.registerAddress }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="经营地址：">
            <span>{{ address }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <common-title class="view-title">
        账户信息
      </common-title>
      <el-row>
        <el-col :span="8">
          <el-form-item label="开户银行：">
            <span>{{ form.depositBank }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户行支行：">
            <span>{{ form.branchBank }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="银行账号：">
            <span>{{ form.bankAccount }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <common-title class="view-title">
        资质证照
      </common-title>
      <div class="image-box">
        <!-- 每次点开预览都会重新加载所有图片 -->
        <el-image
          v-for="item in qualifications"
          :key="item"
          lazy
          style="width: 100%; height: 160px"
          fit="cover"
          :src="item"
          :preview-src-list="qualifications"
          :initial-index="1">
          <template #placeholder>
            <div class="image-slot">
              Loading
              <span class="dot">
                ...
              </span>
            </div>
          </template>
        </el-image>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { GetSellerDetail } from '@/api/settled'
import { useStore } from '@/store'
import CommonTitle from '@/components/CommonTitle/index.vue'
import { GetRegions } from '@/api/common'
import { CorpType } from '@/utils/constant'
interface Area {
  province: string | undefined
  city: string | undefined
  district: string | undefined
}
export default defineComponent({
  components: { CommonTitle },
  setup () {
    const store = useStore()

    const form = ref({
      bankAccount: '',
      bankCode: '',
      branchBank: '',
      businessAddress: '',
      city: '',
      connectMobile: '',
      connectPerson: '',
      corpName: '',
      corpType: -1,
      depositBank: '',
      district: '',
      email: '',
      idCard: '',
      name: '',
      province: '',
      qualificationDTOList: [],
      registerAddress: '',
      status: -1,
      uniformCreditCode: ''
    })
    const qualifications = ref<string[]>([])
    const areasState = reactive<Area>({
      province: '',
      city: '',
      district: ''
    })

    const corpTypeName = computed(() => {
      return CorpType.get(form.value.corpType)
    })
    const address = computed(() => {
      return `${areasState.province}${areasState.city}${areasState.district}${form.value?.businessAddress || ''}`
    })

    const getRegions = (level: number, pid: number | string) => {
      return new Promise<RegionListData[]>((resolve) => {
        GetRegions({
          level,
          pid
        }).then(data => {
          resolve(data)
        })
      })
    }

    GetSellerDetail({
      sellerId: store.state.user.sellerId
    }).then(data => {
      // form.value = data
      Object.assign(form.value, data)
      qualifications.value = data?.qualificationDTOList.map(_ => {
        return _.path
      })
      getRegions(1, 0).then(data => {
        areasState.province = data?.find(_ => _.id === +form.value?.province)?.name || ''
      })
      getRegions(2, form.value.province).then(data => {
        areasState.city = data?.find(_ => _.id === +form.value?.city)?.name || ''
      })
      getRegions(3, form.value.city).then(data => {
        areasState.district = data?.find(_ => _.id === +form.value?.district)?.name || ''
      })
    })

    return {
      form,
      qualifications,
      corpTypeName,
      address
    }
  }
})
</script>

<style scoped lang="scss">
.view-container {
  position: relative;
  max-width: 1300px;
  .is-certified-icon {
    width: 77px;
    height: 67px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    position: absolute;
    right: 30px;
    top: 60px;
  }
  .certified-icon {
    background-image: url("img/common/certified.png");
  }
  .not-certified-icon {
    background-image: url("img/common/not-certified.png");
  }
  .image-box {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 22px;
    grid-row-gap: 22px;
    .el-image {
      border-radius: 4px;
      :deep(.el-image__error) {
        background: #EAECF2;
      }
      .image-slot {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #EAECF2;
        color: #666666;
      }
    }
  }
  :deep(.el-form-item__label) {
    font-size: 14px;
    color: #333333;
    font-weight: 600;
  }
  :deep(.el-form-item__content) {
    font-size: 14px;
    color: #333333;
  }
}
</style>
