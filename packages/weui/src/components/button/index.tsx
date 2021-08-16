import { Button } from '@tarojs/components'
import type { ButtonProps } from '../../../types/button.d'
import Loading from '../loading'

export default function Index(props: ButtonProps = { children: '' }) {
  const { size, type, className, loading, disabled, ...others } = props
  let cls = ''
  if (size === 'full') {
    if (!type || type === 'primary') {
      cls = 'weui-btn_cell weui-btn_cell-primary'
    } else if (type === 'default') {
      cls = 'weui-btn_cell weui-btn_cell-default'
    } else if (type === 'warn') {
      cls = 'weui-btn_cell weui-btn_cell-warn'
    }
  } else {
    if (!type || type === 'primary') {
      cls = 'weui-btn weui-btn_primary'
    } else if (type === 'default') {
      cls = 'weui-btn weui-btn_default'
    } else if (type === 'warn') {
      cls = 'weui-btn weui-btn_warn'
    }

    if (size === 'small') {
      cls = cls + ' weui-btn_mini'
    } else if (size === 'around') {
      cls = cls + ' weui-btn_around'
    }
  }

  if (loading) {
    cls = cls + ' weui-btn_loading'
  }

  if (disabled) {
    cls = cls + ' weui-btn_disabled'
  }

  return (
    <Button className={`${cls} ${className || ''}`} {...others}>
      <>
        {loading && (
          <Loading type={!type || type === 'primary' ? 'similar' : undefined} />
        )}
        {props.children}
      </>
    </Button>
  )
}
