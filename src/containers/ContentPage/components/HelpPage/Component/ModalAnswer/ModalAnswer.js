import { Button, Modal } from 'antd';

export default function ModalAnswer({isVisible,setIsVisible,title,content}) {
    
    return (
        <Modal
        title={(<h3>{title}</h3>)}
        centered
        visible={isVisible}
        onOk={() => setIsVisible(false)}
        onCancel={() => setIsVisible(false)}
        width={1000}
        footer={[
            <Button key="back" onClick={e=>setIsVisible(false)}>
              Return
            </Button>
          ]}
      >
        <span>{content}</span>
      </Modal>
    )
}