import { View, Image } from '@tarojs/components'
import { useDidHide, useDidShow } from '@tarojs/taro'
import { useEffect, useRef } from 'react'
import {
  MiniBar,
  MiniLoginButton,
  Button,
  MiniUserButton,
  MiniPhoneButton,
  Loading,
  Icon,
  ActionSheet,
  ActionSheetItem,
  IActionSheetRef,
  SearchBar,
  Modal,
  IModalRef,
  Dialog,
  IDialogRef,
  HalfScreen,
  IHalfScreenRef,
  Badge,
  Progress,
  Calendar,
} from '@antmjs/antmui'
import '@antmjs/antmui/dist/style/index.less'

export default function Index() {
  const showRef = useRef<IActionSheetRef>()
  const searchRef = useRef<HTMLInputElement>()
  const modalRef = useRef<IModalRef>()
  const dialogRef = useRef<IDialogRef>()
  const halfScreenRef = useRef<IHalfScreenRef>()
  useEffect(function () {
    console.info('index page load')
    return function () {
      console.info('index page unload')
    }
  }, [])
  useDidShow(function () {
    console.info('index page show')
  })
  useDidHide(function () {
    console.info('index page hide')
  })

  return (
    <View className="pages-index-index">
      {process.env.TARO_ENV !== 'h5' && (
        <MiniBar homeUrl="pages/ui/index" title="首页" />
      )}
      <SearchBar
        cref={searchRef}
        onInput={() => {
          console.log('......', searchRef.current?.value)
        }}
        onCancel={() => {
          console.log(',,,,,', searchRef.current?.value)
        }}
        onClear={() => {
          console.log(',,,,,', searchRef.current?.value)
        }}
      />
      <Calendar
        marks={[{ value: '2021/11/10' }]}
        isMultiSelect
        currentDate={{ start: '2021/11/1', end: '2021/11/11' }}
      />
      <Progress percent={70} status="progress" />
      <Button
        size="around"
        type="primary"
        onClick={() => {
          halfScreenRef.current!.show()
        }}
      >
        halfScreen
      </Button>
      <Button
        size="around"
        type="primary"
        onClick={() => {
          dialogRef.current!.show()
        }}
      >
        dialog
      </Button>
      <Button
        size="around"
        type="primary"
        onClick={() => {
          modalRef.current!.show()
        }}
      >
        modal
      </Button>
      <Button
        size="around"
        type="primary"
        onClick={() => {
          showRef.current!.show()
        }}
      >
        action sheet
      </Button>
      <View style={{ backgroundColor: 'grey' }}>
        <Loading />
        <Loading type="primary" />
        <Loading type="similar" />
      </View>
      <MiniLoginButton
        size="around"
        type="primary"
        onGetLoginCode={(res) => {
          console.log(res)
        }}
        onFail={(e) => {
          console.log(e)
        }}
      >
        授权登录
      </MiniLoginButton>
      <MiniUserButton
        size="around"
        type="primary"
        onGetUserInfo={(res) => {
          console.log(res)
        }}
        onFail={(e) => {
          console.log(e)
        }}
      >
        授权用户信息
      </MiniUserButton>
      <MiniPhoneButton
        size="around"
        type="primary"
        onGetPhone={(res) => {
          console.log(res)
        }}
        onFail={(e) => {
          console.log(e)
        }}
      >
        授权用户手机号
      </MiniPhoneButton>
      <Button size="around" type="primary">
        页面主操作
      </Button>
      <Button size="around" type="primary" loading>
        页面主操作
      </Button>
      <Button size="around" type="primary" disabled>
        页面主操作
      </Button>
      <Button size="normal" type="primary">
        页面主操作
      </Button>
      <Button size="normal" type="primary" loading>
        页面主操作
      </Button>
      <Button size="normal" type="primary" disabled>
        页面主操作
      </Button>
      <Button size="normal" type="default">
        页面次要操作
      </Button>
      <Button size="normal" type="default" loading>
        页面次要操作
      </Button>
      <Button size="normal" type="default" disabled>
        页面次要操作
      </Button>
      <Button size="normal" type="warn">
        警告类操作
      </Button>
      <Button size="normal" type="warn" loading>
        警告类操作
      </Button>
      <Button size="normal" type="warn" disabled>
        警告类操作
      </Button>
      <Button size="full" type="default">
        普通行按钮
      </Button>
      <Button size="full" type="primary">
        强调行按钮
      </Button>
      <Button size="full" type="primary">
        <>
          <Image
            className="antmui-btn_cell__icon"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII="
          />
          强调行按钮
        </>
      </Button>
      <Button size="full" type="warn">
        警告行按钮
      </Button>
      <Button type="primary" size="small" loading>
        按钮
      </Button>
      <Button type="default" size="small">
        按钮
      </Button>
      <Button type="warn" size="small">
        按钮
      </Button>
      <Badge value="NEW">
        <Button size="normal" type="primary" loading>
          页面主操作
        </Button>
      </Badge>
      <View>
        antmui-round-minus
        <Icon name="antmui-round-minus" />
      </View>
      <View>
        antmui-round-minus-fill
        <Icon name="antmui-round-minus-fill" />
      </View>
      <View>
        antmui-close
        <Icon name="antmui-close" />
      </View>
      <View>
        antmui-round-check-fill
        <Icon name="" />
      </View>
      <View>
        antmui-round-check
        <Icon name="antmui-round-check" />
      </View>
      <View>
        antmui-round-close-fill
        <Icon name="antmui-round-close-fill" />
      </View>
      <View>
        antmui-round-close
        <Icon name="antmui-round-close" />
      </View>
      <View>
        antmui-round-arrow-fill
        <Icon name="antmui-round-arrow-fill" />
      </View>
      <View>
        antmui-round-arrow
        <Icon name="antmui-round-arrow" />
      </View>
      <View>
        antmui-search
        <Icon name="antmui-search" />
      </View>
      <View>
        antmui-round-time-fill
        <Icon name="antmui-round-time-fill" />
      </View>
      <View>
        antmui-round-time
        <Icon name="antmui-round-time" />
      </View>
      <View>
        antmui-arrow
        <Icon name="antmui-arrow" />
      </View>
      <View>
        antmui-round-question-fill
        <Icon name="antmui-round-question-fill" />
      </View>
      <View>
        antmui-round-question
        <Icon name="antmui-round-question" />
      </View>
      <View>
        antmui-top
        <Icon name="antmui-top" />
      </View>
      <View>
        antmui-refresh
        <Icon name="antmui-refresh" />
      </View>
      <View>
        antmui-delete-fill
        <Icon name="antmui-delete-fill" />
      </View>
      <View>
        antmui-delete
        <Icon name="antmui-delete" />
      </View>
      <View>
        antmui-round
        <Icon name="antmui-round" />
      </View>
      <View>
        antmui-round-info-fill
        <Icon name="antmui-round-info-fill" />
      </View>
      <View>
        antmui-round-info
        <Icon name="antmui-round-info" />
      </View>
      <View>
        antmui-check
        <Icon name="antmui-check" />
      </View>
      <ActionSheet cref={showRef} title="dddddj哈哈哈" subTitle="dddddj哈哈哈">
        <ActionSheetItem
          onClick={() => {
            console.log('hhh')
          }}
        >
          <View>哈哈哈</View>
          <View>哈哈哈</View>
        </ActionSheetItem>
        <ActionSheetItem
          onClick={() => {
            console.log('hhhh1')
          }}
        >
          哈哈哈1
        </ActionSheetItem>
      </ActionSheet>
      <Modal
        cref={modalRef}
        title="标题"
        content="这个里面是内容"
        cancelText="取消"
        onCancel={() => {
          console.log('取消了')
        }}
        confirmText="确定"
        onConfirm={() => {
          console.log('确定了')
        }}
      />
      <Dialog
        cref={dialogRef}
        closeIconPosition="bottom-center"
        onClose={() => {
          console.log('取消了')
        }}
      >
        这里是内容
      </Dialog>
      <HalfScreen
        cref={halfScreenRef}
        onConfirm={() => {
          console.log('确定了')
        }}
      >
        <View className="antmui-half-screen-dialog__bd">
          <View className="antmui-half-screen-dialog__desc">
            辅助描述内容，可根据实际需要安排
          </View>
          <View className="antmui-half-screen-dialog__tips">
            辅助提示内容，可根据实际需要安排
          </View>
        </View>
        <View className="antmui-half-screen-dialog__ft">
          <Button type="default">辅助操作</Button>
          <Button
            type="primary"
            className="antmui-btn antmui-btn_primary"
            onClick={() => {
              halfScreenRef.current!.hide()
            }}
          >
            主操作
          </Button>
        </View>
      </HalfScreen>
    </View>
  )
}
