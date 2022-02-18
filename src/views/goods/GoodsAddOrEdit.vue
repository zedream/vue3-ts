<template>
  <div class="view-container">
    <common-title class="view-title" back>
      {{ title }}
    </common-title>
    <el-form
      ref="ruleFormRef"
      label-width="110px"
      label-position="left"
      class="form"
      :rules="rules"
      :model="form">
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item prop="sellerName" label="商家名称">
            <div>{{ form.sellerName }}</div>
          </el-form-item>
        </el-col>
        <!--        <el-col :span="8">-->
        <!--          <el-form-item prop="name" label="油品名称">-->
        <!--            <el-input-->
        <!--              v-model="form.name"-->
        <!--              placeholder="请输入油品名称"-->
        <!--              clearable />-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
        <el-col :span="8">
          <el-form-item prop="oilType" label="油品类型">
            <el-select
              v-model="form.oilType"
              clearable
              placeholder="请选择油品类型"
              @change="handleOilTypeChange">
              <el-option
                v-for="item in OilType"
                :key="item[0]"
                :label="item[1]"
                :value="item[0]" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="oilModel" label="油品规格">
            <el-select v-model="form.oilModel" clearable placeholder="请选择油品规格">
              <el-option
                v-for="item in oilModels"
                :key="item.oilModel"
                :label="item.oilModel"
                :value="item.oilModel" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item prop="oilDepotCityCode" label="油库区域">
            <el-select
              v-model="form.oilDepotCityCode"
              filterable
              clearable
              placeholder="请选择油品规格"
              @change="handleCityChange">
              <el-option
                v-for="item in cityList"
                :key="item.id"
                :label="item.name"
                :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="oilDepotCode" label="油库名称">
            <el-select
              v-model="form.oilDepotCode"
              clearable
              placeholder="请选择油品规格"
              @change="handleDepotChange">
              <el-option
                v-for="item in oilDepotList"
                :key="item.oilDepotCode"
                :label="item.oilDepotName"
                :value="item.oilDepotCode" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="oilDepotAddress" label="油库地址">
            <div>{{ form.oilDepotAddress }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item prop="unit" label="销售单位">
            <el-radio-group v-model="form.unit">
              <el-radio label="t">
                吨
              </el-radio>
              <el-radio label="l">
                升
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="supportLockPrice" label="是否支持锁价">
            <el-radio-group v-model="form.supportLockPrice">
              <el-radio :label="1">
                是
              </el-radio>
              <el-radio :label="0">
                否
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="promotionType" label="商品类型">
            <el-select
              v-model="form.promotionType"
              clearable
              placeholder="请选择商品类型"
              @change="promotionTypeChange">
              <el-option
                v-for="item in (form.self === 1 ? SelfSaleType : SaleType)"
                :key="item[0]"
                :label="item[1]"
                :value="item[0]" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item prop="minQuantity" label="最小购买量">
            <el-input-number
              v-model="form.minQuantity"
              :step="100"
              :min="0"
              controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="maxQuantity" label="最大购买量">
            <el-input-number
              v-model="form.maxQuantity"
              :step="100"
              :min="0"
              controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="totalQuantity" label="总库存数量">
            <el-input
              v-model="form.totalQuantity"
              placeholder="请输入总库存数量"
              clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item prop="marketPrice" label="市场价格">
            <div class="form-item-tip-box">
              <el-input-number
                v-model="form.marketPrice"
                :precision="2"
                :step="10"
                :min="0"
                controls-position="right" />
              <el-tooltip
                effect="dark"
                content="销售原价"
                placement="top">
                <el-button class="form-item-tip" type="text">
                  <i class="iconfont icon-what" />
                </el-button>
              </el-tooltip>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="salePrice" label="销售价格">
            <div class="form-item-tip-box">
              <el-input-number
                v-model="form.salePrice"
                :precision="2"
                :step="10"
                :min="0"
                controls-position="right" />
              <el-tooltip
                effect="dark"
                content="客户成交价格"
                placement="top">
                <el-button class="form-item-tip" type="text">
                  <i class="iconfont icon-what" />
                </el-button>
              </el-tooltip>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="downPayRatio" label="销售付款比例">
            <el-input-number
              v-model="form.downPayRatio"
              :precision="2"
              :step="1"
              :min="0"
              :max="100"
              controls-position="right" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item prop="goodsType" label="库存类型">
            <el-select v-model="form.goodsType" clearable placeholder="请选择库存类型">
              <el-option
                v-for="item in StockType"
                :key="item[0]"
                :label="item[1]"
                :value="item[0]" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="status" label="上架状态">
            <el-radio-group v-model="form.status">
              <el-radio :label="1">
                上架
              </el-radio>
              <el-radio :label="0">
                下架
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col />
      </el-row>
      <el-row>
        <el-col :span="24">
          <rich-text-editor ref="editorRef" v-model="form.oilDetail" />
        </el-col>
      </el-row>
      <div class="button-box">
        <el-button type="primary" class="submit-button" @click="handleSubmit">
          确认
        </el-button>
      </div>
    </el-form>
    <adjust-stock-layer v-model="layerVisible" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { GetGoodsDetail, GoodsAdd, GoodEdit } from '@/api/goods'
import { name } from '../../../config/config'
import { OilType, SaleType, SelfSaleType, StockType } from '@/utils/constant'
import AdjustStockLayer from './components/AdjustStockLayer.vue'
import { useFormGoodsAddOrEdit } from './use-form-goods-add-or-edit'
import type { ElForm } from 'element-plus'
import { GetOilDepotByCity, GetRegions, GetOilModels } from '@/api/common'
import RichTextEditor from '@/components/RichTextEditor/index.vue'
import { CommonType } from '@/store/mutation.types'
export default defineComponent({
  components: { AdjustStockLayer, RichTextEditor },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const myForm = useFormGoodsAddOrEdit()

    const title = ref('')
    const ruleFormRef = ref<InstanceType<typeof ElForm>>()
    const layerVisible = ref(true)
    const cityList = ref<RegionListData[]>([])
    const oilDepotList = ref<OilDepotData[]>([])
    const oilModels = ref<OilModelData[]>([])
    const editorRef = ref()

    const handleSubmit = () => {
      ruleFormRef.value?.validate(valid => {
        if (valid) {
          if (myForm.form.id) {
            GoodEdit(myForm.form).then(() => {
              ElMessage.success('编辑商品成功')
              router.back()
            })
          } else {
            GoodsAdd(myForm.form).then(() => {
              ElMessage.success('新增商品成功')
              router.back()
            })
          }
        }
      })
    }

    const handleOilTypeChange = (value) => {
      if (value) {
        myForm.form.oilTypeName = OilType.get(value)
        getOilModels(value)
      } else {
        myForm.form.oilModel = ''
        myForm.form.oilTypeName = ''
      }
    }

    const handleCityChange = (value) => {
      if (value) {
        myForm.form.oilDepotCode = ''
        getDepotList()
      } else {
        myForm.form.oilDepotCode = ''
        myForm.form.oilDepotAddress = ''
        myForm.form.latitude = ''
        myForm.form.longitude = ''
      }
    }

    const handleDepotChange = () => {
      const oilDepot = oilDepotList.value.find(_ => _.oilDepotCode === myForm.form.oilDepotCode)
      myForm.form.oilDepotAddress = oilDepot?.oilDepotAddress
      myForm.form.oilDepotName = oilDepot?.oilDepotName
      myForm.form.latitude = oilDepot?.latitude
      myForm.form.longitude = oilDepot?.longitude
    }

    const promotionTypeChange = (value) => {
      // 次日达去掉油库名称及地址
      if (value === 2) {
        myForm.form.oilDepotCode = ''
        myForm.form.oilDepotAddress = ''
      } else {
        console.log(value)
      }
    }

    const getOilModels = (oilType) => {
      GetOilModels({ oilType }).then(data => {
        oilModels.value = data
        myForm.form.oilModel = data[0]?.oilModel
      })
    }

    const getDepotList = () => {
      GetOilDepotByCity(myForm.form.oilDepotCityCode).then(data => {
        oilDepotList.value = data
        if (myForm.form.oilDepotCode) {
          const oilDepot = data.find(_ => _.oilDepotCode === myForm.form.oilDepotCode)
          myForm.form.oilDepotAddress = oilDepot?.oilDepotAddress
          myForm.form.latitude = oilDepot?.latitude
          myForm.form.longitude = oilDepot?.longitude
        } else {
          myForm.form.oilDepotCode = data[0].oilDepotCode
          myForm.form.oilDepotAddress = data[0].oilDepotAddress
          myForm.form.latitude = data[0].latitude
          myForm.form.longitude = data[0].longitude
        }
      })
    }

    if (route.params.code !== 'add') {
      title.value = '商品编辑'
      GetGoodsDetail({
        code: route.params.code
      }).then(data => {
        Object.assign(myForm.form, data)
        myForm.form.oilType && (myForm.form.oilTypeName = OilType.get(myForm.form.oilType))
        myForm.form.oilDetail && editorRef.value.setHtml(myForm.form.oilDetail)
        myForm.form.oilType && getOilModels(myForm.form.oilType)
        myForm.form.oilDepotCode && getDepotList()
      }).catch(() => {
        router.replace({ name: 'NotFound' })
      })
    } else {
      title.value = '商品新增'
    }

    if (store.state.common.cityList.length) {
      cityList.value = store.state.common.cityList
    } else {
      GetRegions({ level: 2 }).then(data => {
        cityList.value = data
        store.commit(`common/${CommonType.SET_CITY_LIST}`, data)
      })
    }

    document.title = `${title.value} - ${name}`

    return {
      ...myForm,
      title,
      layerVisible,
      ruleFormRef,
      cityList,
      oilDepotList,
      oilModels,
      editorRef,
      OilType,
      SaleType,
      SelfSaleType,
      StockType,
      handleOilTypeChange,
      handleCityChange,
      handleDepotChange,
      promotionTypeChange,
      handleSubmit
    }
  }
})
</script>

<style scoped lang="scss">
.view-container {
  max-width: 1300px;
  .form {
    .el-select, .el-input-number {
      width: 100%;
    }
    .form-item-tip-box {
      display: flex;
      align-items: center;
      width: 100%;
      .el-input-number {
        flex: 1;
      }
      .form-item-tip {
        padding-left: 10px;
        padding-right: 10px;
      }
    }
    .button-box {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      .submit-button {
        width: 100px;
      }
    }
  }
}
</style>
