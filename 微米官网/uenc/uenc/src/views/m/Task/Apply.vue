<!--
 * @Author: yaoyuting
 * @Date: 2021-04-18 17:03:57
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-12 15:33:48
 * @Descripttion: 
-->
<template>
    <div class="Apply">
        <el-form :model="applyForm" class="demo-form-inline">
          <el-form-item :label="$t('dialog.id')">
            <el-input v-model="applyForm.Facebook" ></el-input>
          </el-form-item>
          <el-form-item :label="$t('dialog.github')">
            <el-input v-model="applyForm.Github" ></el-input>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                applyForm: {
                    Facebook: '',
                    Github: ''
                }
            }
        },
    }
</script>

<style lang="less" scoped>

</style>