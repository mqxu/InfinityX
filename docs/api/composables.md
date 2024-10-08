## 组合式函数 Composables

## 1. 组合式 API 概念

在 Vue 应用的概念中，“组合式函数”(Composables) 是一个利用 Vue 的组合式 API 来封装和复用**有状态逻辑**的函数。

当构建前端应用时，我们常常需要复用公共任务的逻辑。例如为了在不同地方格式化时间，我们可能会抽取一个可复用的日期格式化函数。这个函数封装了**无状态的逻辑**：它在接收一些输入后立刻返回所期望的输出。复用无状态逻辑的库有很多，比如 [lodash](https://lodash.com/) 或是 [date-fns](https://date-fns.org/)。

相比之下，有状态逻辑负责管理会随时间而变化的状态。一个简单的例子是跟踪当前鼠标在页面中的位置。在实际应用中，也可能是像触摸手势或与数据库的连接状态这样的更复杂的逻辑。

## 2. 自定义组合函数

组合式 API 的一个强大特性就是支持自定义组合函数（Composable），可以通过将重复逻辑封装成独立的函数，实现代码的复用。自定义组合函数的特点是将状态和行为整合到一个函数中，方便在多个组件中调用。

创建项目

![img](https://mqxu-upload.oss-cn-hangzhou.aliyuncs.com/md/1728314434762-f9e62685-63c9-4340-bd52-b2211f296b6b.png)

### 2.1 计数器组合函数

src 新建 composables 子目录，新建 useCounter.ts，如下：

```typescript
import { ref } from 'vue'

// 自定义组合函数，定义计数器逻辑
export function useCounter(initialValue = 0) {
  // 定义一个响应式的计数器变量
  const count = ref<number>(initialValue)

  // 增加计数的函数
  const increment = () => {
    count.value++
  }

  // 减少计数的函数
  const decrement = () => {
    count.value--
  }

  return { count, increment, decrement }
}
```

components/Counter.vue 中使用自定义计数器的组件：

```vue
<template>
  <div>
    <p>当前计数：{{ count }}</p>
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
  </div>
</template>

<script setup lang="ts">
import { useCounter } from "../composables/useCounter";

// 使用自定义组合函数 useCounter
const { count, increment, decrement } = useCounter(10);
</script>

<style scoped>
button {
  background-color: #73b7bf;
  color: #fff;
  margin: 10px;
}
</style>
```

**解释**：

- `useCounter` 是一个自定义组合函数，它封装了计数器的逻辑，并返回 `count` 和操作方法 `increment`、`decrement`；
- 通过调用 `useCounter(10)` 初始化计数器值，并在模板中使用这些返回的状态和方法。

App.vue 中引入 Counter.vue  组件：

```vue
<script setup lang="ts">
import Counter from "./components/Counter.vue";
</script>

<template>
  <Counter />
</template>
```

观察结果

![img](https://mqxu-upload.oss-cn-hangzhou.aliyuncs.com/md/1728314849343-4da3620f-19d8-43e6-aecd-9f1656c3365c-20241008095134509.png)

拓展：加入计数器清零功能。

### 2.2 本地存储管理组合函数

```typescript
import { ref, watch } from 'vue'

// 自定义组合函数，用于管理本地存储中的数据
export function useLocalStorage(key: string, defaultValue: string) {
  // 从 localStorage 中获取数据
  const storedValue = localStorage.getItem(key) || defaultValue
  const data = ref<string>(storedValue)

  // 监听数据的变化，并同步更新到 localStorage
  watch(data, (newValue) => {
    localStorage.setItem(key, newValue)
  })

  return data
}
```

在 components/LocalStorage.vue 中使用自定义本地存储组合函数的组件：

```vue
<template>
  <div>
    <p>本地存储的值：{{ storedData }}</p>
    <input v-model="storedData" placeholder="更新本地存储数据" />
  </div>
</template>

<script setup lang="ts">
import { useLocalStorage } from "../composables/useLocalStorage";

// 使用自定义组合函数 useLocalStorage
const storedData = useLocalStorage("username", "zhangsan");
</script>
```

**解释**：

- `useLocalStorage` 组合函数帮助管理 `localStorage` 中的数据，自动同步到本地存储；
- 使用 `watch` 监听数据变化并更新到本地存储，使其值能够持久化。

App.vue 使用测试：

![img](https://mqxu-upload.oss-cn-hangzhou.aliyuncs.com/md/1728315132426-00dbcb3b-a53b-493d-8bef-33ea2a8b1928.png)

### 2.3 练习

1. 封装一个通用的倒计时计时器逻辑，可复用到多个组件中；
2. 封装一个通用的手机短信发送逻辑（模拟），可复用到多个组件中；
3. 封装一个表单验证组合式函数，可以帮助管理表单的验证状态，包括验证规则、错误消息等。

## 3. VueUse：提升组合式 API 的开发效率

[VueUse](https://vueuse.org/) 是基于 Vue 3 组合式 API 的实用工具库，提供了大量常见的组合函数，简化开发中的许多需求。通过使用 VueUse，你可以轻松处理如计时器、窗口尺寸、网络状态等常见的应用需求。

安装 vueuse

```bash
npm i @vueuse/core
```

### 3.1 使用 VueUse 的 `useMouse`

```vue
<template>
  <div>
    <p>鼠标位置：X ：{{ x }}, Y ： {{ y }}</p>
  </div>
</template>

<script setup lang="ts">
import { useMouse } from "@vueuse/core";

// 使用 VueUse 的 useMouse 组合函数
const { x, y } = useMouse();
</script>
```

**解释**：

- `useMouse` 是 VueUse 提供的组合函数，用于追踪鼠标位置。调用后，`x` 和 `y` 分别代表鼠标的 X 轴和 Y 轴的位置。

### 3.2 实现浏览器窗口大小自动调整响应式布局

使用 `useWindowSize` 组合函数，我们可以实时获取浏览器窗口的宽度和高度，并根据这些值动态调整布局或样式。例如，当窗口宽度小于某个阈值时，切换为移动端布局。

```vue
<template>
  <div>
    <p>当前窗口大小: 宽: {{ width }}px, 高: {{ height }}px</p>
    <div :class="{ 'mobile-layout': isMobile }">
      <p>{{ isMobile ? "移动端布局" : "桌面端布局" }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { computed } from "vue";

// 获取窗口大小
const { width, height } = useWindowSize();

// 判断是否为移动端布局（窗口宽度小于768px时）
const isMobile = computed(() => width.value < 768);
</script>

<style>
div {
  text-align: center;
  margin-top: 20px;
}

.mobile-layout {
  background-color: lightblue;
}

.mobile-layout p {
  font-size: 18px;
}

@media (min-width: 768px) {
  .mobile-layout {
    background-color: lightcoral;
  }

  .mobile-layout p {
    font-size: 24px;
  }
}
</style>
```

效果

![img](https://mqxu-upload.oss-cn-hangzhou.aliyuncs.com/md/1728317255207-80da58ac-c55c-4d4f-a0ec-c8b66efbef20.png)

![img](https://mqxu-upload.oss-cn-hangzhou.aliyuncs.com/md/1728317274590-f76275cc-7825-4925-92d6-6776b4f15a34.png)

### 3.3 练习

1. 使用 VueUse 实现白天/夜间模式切换；
2. 查看官方文档，整理 VueUse 的能力，并根据个人兴趣尝试。

## 4. 小结

组合式 API 为 Vue.js 3 带来了模块化和灵活性的巨大提升。通过自定义组合函数，开发者可以轻松封装常见逻辑，实现代码复用。借助 VueUse，开发效率得到了进一步提升，提供了众多开箱即用的组合函数，极大简化了开发流程。在复杂应用场景中，组合式 API 让代码更易于维护和扩展。

