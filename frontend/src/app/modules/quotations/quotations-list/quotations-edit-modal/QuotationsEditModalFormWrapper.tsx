import {useQuery} from 'react-query'
import {UserEditModalForm} from './QuotationsEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getUserById} from '../core/_requests'

const QuotationsEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: quotations,
    error,
  } = useQuery(
    `${QUERIES.QUOTATION_LIST}-user-${itemIdForUpdate}`,
    () => {
      return getUserById(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
    }
  )

  if (!itemIdForUpdate) {
    return <UserEditModalForm isUserLoading={isLoading} quotations={{id: undefined}} />
  }

  if (!isLoading && !error && quotations) {
    return <UserEditModalForm isUserLoading={isLoading} quotations={quotations} />
  }

  return null
}

export {QuotationsEditModalFormWrapper}
