import { ViteReactSSG } from 'vite-react-ssg'
import './index.css'
import { routes } from './routes.jsx'

// 동료분의 성공 방식인 '단일 인자 객체' 패턴으로 복구했습니다.
// Navbar는 routes.jsx의 Layout 컴포넌트에 포함되어 있어 
// 이 방식 하나로 UI 보존과 빌드 성공을 모두 잡을 수 있습니다.
export const createRoot = ViteReactSSG({ 
  routes,
  basename: '/'
})
