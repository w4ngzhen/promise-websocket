<template>
  <div>
    <el-row>
      <div class="info-name">
        {{ username }}
      </div>
      <div class="info-datetime">
        {{ dateTime }}
      </div>
    </el-row>
    <el-row>
      <el-input type="textarea" :rows="2" readonly v-model="message"></el-input>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Info",
  props: {
    currentUsername: {
      type: String,
      default() {
        return '';
      }
    },
    data: {
      type: Object,
    },
  },
  computed: {
    isMyInfo() {
      return this.username === this.currentUsername;
    },
    username() {
      return this._.get(this.data, 'username', '');
    },
    dateTime() {
      return this._.get(this.data, 'dateTime', '');
    },
    message() {
      return this._.get(this.data, 'message', '');
    }
  }
};
</script>

<style scoped>

</style>
