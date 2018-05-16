<template>
    <footer class="footer">
        <ul class="menu">
            <li>首页</li>
            <li>发现</li>
            <li>订单</li>
            <li>我的</li>
        </ul>
    </footer>
</template>

<script>
export default {};
</script>

<style lang="less">
.footer {
  position: fixed;
  bottom: 0;
  height: 50px;
  border-top: 1px solid #dfdfdf;
  width: 100%;
  background: #fff;
  & > ul {
    display: flex;
    & > li {
      width: 25%;
      line-height: 50px;
      text-align: center;
    }
  }
}
ul,
li {
  list-style: none;
}

ul {
  margin: 0;
  padding: 0;
}
</style>
