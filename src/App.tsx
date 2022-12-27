import { AntdTheme } from "./core/AntdTheme";
import { AppRouter } from "./core/AppRouter";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <AntdTheme>
        <AppRouter />
      </AntdTheme>
    </RecoilRoot>
  );
}

export default App;
