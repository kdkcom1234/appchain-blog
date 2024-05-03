# blog

**blog** is a blockchain built using Cosmos SDK and Tendermint and created with [Ignite CLI](https://ignite.com/cli).

## Get started

```
ignite chain serve
```

`serve` command installs dependencies, builds, initializes, and starts your blockchain in development.

### Configure

Your blockchain in development can be configured with `config.yml`. To learn more, see the [Ignite CLI docs](https://docs.ignite.com).

### Web Frontend

Additionally, Ignite CLI offers both Vue and React options for frontend scaffolding:

For a Vue frontend, use: `ignite scaffold vue`
For a React frontend, use: `ignite scaffold react`
These commands can be run within your scaffolded blockchain project.

For more information see the [monorepo for Ignite front-end development](https://github.com/ignite/web).

## Release

To release a new version of your blockchain, create and push a new tag with `v` prefix. A new draft release with the configured targets will be created.

```
git tag v0.1
git push origin v0.1
```

After a draft release is created, make your final changes from the release page and publish it.

### Install

To install the latest version of your blockchain node's binary, execute the following command on your machine:

```
curl https://get.ignite.com/username/blog@latest! | sudo bash
```

`username/blog` should match the `username` and `repo_name` of the Github repository to which the source code was pushed. Learn more about [the install process](https://github.com/allinbits/starport-installer).

## Learn more

- [Ignite CLI](https://ignite.com/cli)
- [Tutorials](https://docs.ignite.com/guide)
- [Ignite CLI docs](https://docs.ignite.com)
- [Cosmos SDK docs](https://docs.cosmos.network)
- [Developer Chat](https://discord.gg/ignite)

---

## Steps of create a custom module

### Create a Module

```shell
ignite scaffold module blog
```

### Create Type of a State

```shell
# ignite scaffold type [타입명소문자] 필드목록 .....
ignite scaffold type post title body creator id:uint
```

### Create messages (change states, tx)

```shell
## Create create-post Msg Service
ignite scaffold message create-post title body --response id:uint

```

### Create queries

```shell
## Create list-post Query Service
ignite scaffold query list-post --response post:Post --paginated
```

### Implement Keeper and Msg/Query Service

https://docs.ignite.com/guide/blog/create
https://docs.ignite.com/guide/blog/list

---

## Testing

### Send tokens

```shell
blogd tx bank send alice cosmos1hgetjlxqkv5dssgv6z4xzxtqfpfu0gm76klauf 10token --chain-id blog
```

### Create a blog post

```shell
blogd tx blog create-post hello world --from alice --chain-id blog
blogd tx blog create-post foo bar --from bob --chain-id blog
```

### List all blog posts with pagination

```shell
blogd q blog list-post
```

---

### Create type script client

```shell
ignite generate ts-client --clear-cache
```

### Frontend

```ts
// vite.config.ts
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [nodeResolve()],

  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
});
```

```ts
// main.ts
import { Client } from "../../ts-client";
import { AccountData, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

// const mnemonic =
//   "play butter frown city voyage pupil rabbit wheat thrive mind skate turkey helmet thrive door either differ gate exhibit impose city swallow goat faint";
// const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);

const client = new Client(
  {
    apiURL: "http://localhost:1317",
    rpcURL: "http://localhost:26657",
    prefix: "cosmos",
  }
  // wallet
);

// const account = (await wallet.getAccounts())[0]

let account: AccountData | undefined;

document.querySelector("#connect")?.addEventListener("click", async () => {
  await client.useKeplr();
  const accounts = await client.signer?.getAccounts();
  account = accounts ? accounts[0] : undefined;
  console.log(client.signer?.getAccounts);

  console.log(account);

  const balances = await client.CosmosBankV1Beta1.query.queryAllBalances(
    account!.address
  );
  console.log(balances.data);
});

document.querySelector("#post")?.addEventListener("click", async () => {
  const tx = await client.BlogBlog.tx.sendMsgCreatePost({
    value: {
      title: (document.querySelector("#title") as HTMLInputElement).value,
      body: (document.querySelector("#body") as HTMLTextAreaElement).value,
      // creator와 signer pubkey 비교함
      creator: account!.address,
    },
  });
  console.log(tx.msgResponses);

  const list = await client.BlogBlog.query.queryListPost();
  console.log(list.data);
});
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + TS</title>
  </head>
  <body>
    <div id="app">
      <div style="display: flex; flex-direction: column; width: 400px">
        <input id="title" placeholder="title" />
        <textarea id="body" placeholder="body"></textarea>
        <button id="connect">connect</button>
        <button id="post">post</button>
      </div>
    </div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

---

## Msg 서비스와 Keeper

Cosmos SDK에서 사용자 정의 모듈을 개발할 때, 비즈니스 로직을 어디에 배치할지 결정하는 것은 매우 중요합니다. Cosmos SDK의 아키텍처는 `Msg` 서비스와 `Keeper` 간에 역할을 명확히 구분하여 설계되어 있습니다. 이 두 컴포넌트는 모듈 내에서 서로 다른 역할을 수행하며, 이해하고 올바르게 사용하면 매우 강력한 애플리케이션을 구축할 수 있습니다.

### Msg 서비스

`Msg` 서비스는 외부에서 받은 트랜잭션 요청을 처리하는 인터페이스 역할을 합니다. 즉, `Msg`는 네트워크를 통해 전달된 트랜잭션을 처리하고 유효성을 검사하는 역할을 수행합니다. 일반적으로, `Msg` 서비스는 다음과 같은 작업을 수행합니다:

- 입력 데이터의 유효성 검사
- 트랜잭션의 인증자가 유효한지 확인
- 트랜잭션에 필요한 모든 정보가 올바르게 제공되었는지 검사

`Msg` 서비스는 상태를 변경시키는 작업을 직접 수행하지 않습니다. 대신, 유효성 검사와 권한 검증 후, 실제 상태 변경 로직을 `Keeper`에 위임합니다.

### Keeper

`Keeper`는 모듈의 핵심 로직을 캡슐화하고, 모듈의 상태를 조작하는 함수들을 포함합니다. `Keeper`는 다음과 같은 역할을 수행합니다:

- 상태 변경 로직 구현
- 상태 저장소(stores)와의 상호 작용
- 다른 모듈과의 상호 작용을 위한 인터페이스 제공

`Keeper`는 `Msg` 서비스와는 다르게, 보안적으로 민감한 로직을 내부적으로 처리하며, 다른 모듈의 `Keeper`와도 상호 작용할 수 있습니다.

### 어디에서 로직을 처리하는 것이 좋은가?

비즈니스 로직의 위치 결정은 명확한 책임과 안전한 코드 유지 관리를 위해 중요합니다. 일반적인 지침은 다음과 같습니다:

- **유효성 검사와 권한 검증은 `Msg` 서비스에서 수행**해야 합니다. 이는 트랜잭션이 실행되기 전 필수적인 단계로, 잘못된 요청이나 무단 접근을 걸러내는 역할을 합니다.
- **상태를 변경하는 모든 로직은 `Keeper`에서 처리**해야 합니다. `Keeper`는 모듈의 상태와 관련된 로직을 안전하게 캡슐화하며, 데이터 무결성을 보장합니다.

이렇게 구분하여 로직을 배치함으로써, 코드의 유지 관리가 용이해지고, 각 컴포넌트의 책임이 명확해지며, 보안성이 강화됩니다. 따라서, 사용자 정의 모듈을 설계할 때는 이러한 아키텍처 원칙을 따르는 것이 중요합니다.
