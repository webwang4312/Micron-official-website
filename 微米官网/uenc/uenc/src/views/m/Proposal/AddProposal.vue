<!--
 * @Author: yaoyuting
 * @Date: 2021-04-18 18:50:34
 * @LastEditors: yaoyuting
 * @LastEditTime: 2021-05-19 21:57:33
 * @Descripttion: 
-->
<template>
  <div class="AddProposal">
    <div class="banner">
      <div class="placeholder"></div>
      <div class="title">{{ $t("Proposal.initiate") }}</div>
    </div>

    <div class="content">
      <el-form :model="proposalForm" ref="proposal" :rules="rules" class="demo-form-inline">
        <el-form-item :label="$t('Proposal.Proposer')" prop="name">
          <el-input v-model="proposalForm.name" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Proposal.ptitle')" prop="title">
          <el-input v-model="proposalForm.title" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Proposal.Abstract')" prop="summary">
          <el-input type="textarea" :rows="6" v-model="proposalForm.summary" maxlength="1000"></el-input>
          <!-- <div class="editor">
            <quill-editor
              v-model="proposalForm.summary"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
              style="height: 35vh; margin: 5vh 0px 24vh"
            >
            </quill-editor>
          </div> -->
        </el-form-item>
        <el-form-item :label="$t('Proposal.Target')" prop="target">
          <el-input type="textarea" v-model="proposalForm.target" maxlength="200"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Proposal.Plan')" prop="plan">
          <el-input type="textarea" v-model="proposalForm.plan" maxlength="200"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Proposal.Budget')" prop="budget">
          <el-input v-model="proposalForm.budget"></el-input>
        </el-form-item>
        <!-- <el-form-item :label="$t('Vote.deadline')" prop="deadline">
          <el-date-picker v-model="proposalForm.deadline" type="datetime">
          </el-date-picker>
        </el-form-item> -->
        <div class="btn" @click="release">
          {{ $t("Proposal.Publish") }}
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
class ProposalForm {
  constructor() {
    this.name = "";
    this.title = "";
    this.summary = "";
    this.target = "";
    this.plan = "";
    this.budget = "";
    // this.deadline = "";
    this.createBy = "admin";
  }
}

import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { AddProposal } from "@/assets/server/api.js";
import { FormatTime } from "@/utils/utils.js";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      proposalForm: new ProposalForm(),
      content: "",
      editorOption: {},
      rules: {
        name: [
          {
            required: true,
            message: this.$t("index.switch") === "cn" ? "请输入内容" : "Enter the contents",
            trigger: "blur"
          }
        ],
        title: [
          {
            required: true,
            message: this.$t("index.switch") === "cn" ? "请输入内容" : "Enter the contents",
            trigger: "blur"
          }
        ],
        summary: [
          {
            required: true,
            message: this.$t("index.switch") === "cn" ? "请输入内容" : "Enter the contents",
            trigger: "blur"
          }
        ],
        target: [
          {
            required: true,
            message: this.$t("index.switch") === "cn" ? "请输入内容" : "Enter the contents",
            trigger: "blur"
          }
        ],
        plan: [
          {
            required: true,
            message: this.$t("index.switch") === "cn" ? "请输入内容" : "Enter the contents",
            trigger: "blur"
          }
        ],
        budget: [
          {
            required: true,
            message: this.$t("index.switch") === "cn" ? "请输入内容" : "Enter the contents",
            trigger: "blur"
          }
        ]
        // deadline: [
        //   { type: 'date', required: true, message: '请选择时间', trigger: 'blur' }
        // ],
      }
    };
  },
  methods: {
    async release() {
      // this.proposalForm.deadline = FormatTime(
      //   this.proposalForm.deadline,
      //   "Y-M-D h:m:s"
      // );
      this.$refs["proposal"].validate(async valid => {
        if (valid) {
          const data = await AddProposal(this.proposalForm);
          if (data.code === 0) {
            this.proposalForm = new ProposalForm();
            this.$router.back(-1);
            this.$notify({
              type: "success",
              message:
                this.$t("index.switch") === "cn"
                  ? "提案发布成功，等待审核!"
                  : "successfully, awaiting review！"
            });
          } else {
            this.$notify({ type: "error", message: data.msg });
          }
        }
      });
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {} // 内容改变事件
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  }
};
</script>
<style lang="less">
.AddProposal {
  .editor {
    margin-top: 64px;
  }
  .el-form-item__label {
    font-size: 30px;
    color: #333333;
    width: 100%;
    text-align: left;
    height: 64px;
    line-height: 64px;
    font-weight: 500;
  }
  .el-form-item__error {
    font-size: 20px;
  }
  .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
    color: #633eff;
  }
  .el-input__inner {
    width: 686px;
    height: 72px;
    font-size: 24px;
    border: 1px solid #999999;
    border-radius: 5px;
    .el-input__icon {
      font-size: 20px;
    }
  }
  .el-textarea__inner {
    border: 1px solid #999999;
  }
  .el-date-editor.el-input,
  .el-date-editor .el-input__inner {
    width: 350px;
  }
}
</style>

<style lang="less" scoped>
.AddProposal {
  .banner {
    height: 227 * 2px;
    background-image: url("../../../assets/imagesm/indba2.png");
    background-size: cover;
    background-position: center center;
    display: flex;
    flex-direction: column;
    .placeholder {
      flex: 1;
    }
  }
  .title {
    font-size: 60px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 84px;
    margin-bottom: 110px;
    margin-left: 32px;
  }
  .content {
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0px 0px 28px 0px rgba(10, 10, 146, 0.29);
    color: #000;
    padding: 30px;
    margin-top: -54px;
    margin-bottom: 182px;
  }
  .btn {
    text-align: center;
    margin: 40px auto 90px;
    width: 492px;
    height: 72px;
    line-height: 72px;
    text-align: center;
    background: #5432F4;
    border-radius: 8px;
    font-size: 28px;
    color: #ffffff;
  }
}
</style>
