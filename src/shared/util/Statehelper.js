function loading() {
  this.setState({
    loading: true
  });
}
function notLoading() {
  this.setState({
    loading: false
  });
}
let basicState = {
  loading: false
};

export default function bindall(that) {
  that.loading = loading.bind(that);
  that.notLoading = notLoading.bind(that);
}
export { basicState };
