import {Component} from "react"

interface ErrorBoundaryProps{  children:JSX.Element|JSX.Element[]}

interface ErrorBoundaryState {
  hasError :boolean

}

export class ErrorBoundary extends Component<ErrorBoundaryProps,ErrorBoundaryState>{
  constructor(props:ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true };
  }

  // componentDidCatch(error, errorInfo) {
  //   // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
  //   logErrorToMyService(error, errorInfo);
  // }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return <h1>정보를 불러오지 못했습니다</h1>;
    }

    return this.props.children;
  }
}
