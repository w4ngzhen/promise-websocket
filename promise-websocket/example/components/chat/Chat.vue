<template>
  <div>
    <el-row>
      <info v-for="info in receiveInfos"
            :key="info.uid"
            :current-username="username"
            :data="info"
      />
    </el-row>
    <el-row>
      <el-input v-model="inputMsg"></el-input>
      <el-button type="primary" @click="send">send</el-button>
    </el-row>
  </div>
</template>

<script>
import Info from "./Info";
import PromiseWebSocket from '../../../packages/index';

export default {
  name: "Chat",
  components: {Info},
  data() {
    return {
      serverUrl: 'ws://localhost:9090',
      receiveInfos: [],
      username: '',
      inputMsg: '',
      ws: undefined,
    };
  },
  created() {
    this.ws = new PromiseWebSocket(this.serverUrl);
    this.ws.open()
      .then(_ => {
        this.$message.success('连接成功');
        this.username = 'user' + Math.random();
      })
      .catch(err => this.$message.error(err));
  },
  methods: {
    send() {
      this.ws.send({
        uid: (new Date()).valueOf().toString(),
        username: this.username,
        data: this.inputMsg
      }).then(data => {
        console.log(data);
        this.receiveInfos.push(data.data);
      });
    }
  }
};
</script>

<style scoped>

</style>
