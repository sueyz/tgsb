import React from 'react'
import { MenuItem } from './MenuItem'
import { MenuInnerWithSub } from './MenuInnerWithSub'
import { MegaMenu } from './MegaMenu'
import { useIntl } from 'react-intl'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({ id: 'MENU.DASHBOARD' })} to='/dashboard' />
      <MenuItem title='Companies' to='/companies' />

      <MenuInnerWithSub
        title='Quotations'
        to='/quotations'
        hasArrow={true}
        menuPlacement='bottom-start'
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        <MenuItem to='/quotations/regular' title='Regular' hasBullet={true} />
        <MenuItem to='/quotations/sub-consultant' title='Sub-Consultant' hasBullet={true} />

      </MenuInnerWithSub>


    </>
  )
}
