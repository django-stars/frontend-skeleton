import { withFinalForm } from '@ds-frontend/resource'
import validate from './utils/validate'


export default withFinalForm(
  {
    validate,
  },
  {
    namespace: 'session',
    endpoint: 'accounts/signin',
  },
  {
    prefetch: false,
  }
)
