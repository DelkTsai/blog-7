/**
 * Created by zhangran on 16/10/8.
 */

import route from "koa-router";

var router = route()

router.post('/api/release/:id', function*(next) {
  this.body = {
    'status': 100
  }
})


export default router