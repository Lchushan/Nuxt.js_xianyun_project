<template>
  <div>
    <Header />
    <!-- 相当于router-view，占位符 -->
    <nuxt />
    <Footer />
  </div>
</template>


<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
export default {
  components:{
    Header,
    Footer
  }
}
</script>

<style>
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
font,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
dd,
dl,
dt,
li,
ol,
ul,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td {
  margin: 0;
  padding: 0;
  border: 0;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
ol,
ul {
  list-style: none;
}
q:before,
q:after,
blockquote:before,
blockquote:after {
  content: '';
}
a {
  color: inherit;
  text-decoration: none;
}
a:hover {
  color: inherit;
}
i,
em {
  font-style: normal;
}
</style>
