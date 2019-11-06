export default function Loading({ isLoading, children }) {
  return isLoading ? <div className='loading-wrapper'>loading..</div> : children
}
