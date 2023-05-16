import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { 
	EyeOutlined, DeleteOutlined, SmileOutlined, EditOutlined, FileDoneOutlined, SyncOutlined
} from '@ant-design/icons';
import baseUrl from './utils/baseUrl';
import { Button, Col, Form, Input, message, Modal, Popconfirm, Row, Table, Tooltip} from "antd";

function App() {
  const [user, setUser] = useState([])
  const [userEdit, setUserEdit] = useState({})
  const [userAgregate, setUserAgregate] = useState({})
  const [modalVisible,setIsModalVisible] = useState(false)
  const [modal,setIsModal] = useState(false)

  const tableColumns = [
    {
      title: 'Id',
      dataIndex: 'id',
      width: 60,
      sorter: {
        compare: (a, b) => a.id - b.id,
      },
    },
    {
      title: 'Nombre de Usuario',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name - b.name,
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: {
        compare: (a, b) => a.email - b.email,
      },
    },
    {
      title: 'Opciones',
      render: (record) => {
        return (
          <>
            <Tooltip title="Editar usaurio">
							<Button 
                type="" 
                className=" shadow-sm mr-2" 
                icon={<EditOutlined/>} 
                onClick={ () => EditOrder(record) }  
                style={{ color: '#000', background:'#04D182'}}
              />
						</Tooltip>
            <Tooltip title="Eliminar usuario">
              <Popconfirm 
                placement="bottom" 
                title={"¿Desea eliminar el usuario?"} 
                onConfirm={ () => DeleteOrder(record)} 
                okText="Si, eliminar" 
                cancelText="No" >
                <Button type="" 
                  className="shadow-sm mr-2 text-center"
                  style={{background:'#FF6B72'}}
                  icon={<DeleteOutlined style={{  color: '#fff'}} />} 
                />
              </Popconfirm>
						</Tooltip>
          </>
        );
      }
      
    }
  ]

  const EditOrder = async (record) =>{
    console.log(record);
    setUserEdit({...record})
    setIsModalVisible(true);
    // console.log(viewOrder);
  }

  const AgregateUser = async () =>{
    setIsModal(true);
  }

  const getUser = async() => {
    const url = `${baseUrl}/api/users`;
    try {
        const resp = await axios.get(url,{      
          // headers: {
          //   'x-token': localStorage.getItem('x-token')
          // }
        })
        setUser(resp.data);
    } catch (error) {
      console.log(error);     
    }
  }

  const formSuccessActualizar = async (record) => {
    const {
      id, 
      name,
      email
    } = userEdit;

    try {
      const url = `${baseUrl}/api/users/${id}`;
      await axios.put(url, {name,email})
      setUserEdit({})
      message.success({ content: 'Se actualizo el usuario', duration: 5,
        style: { marginTop: '60px' },
      });
      setIsModalVisible(false);
      getUser()
    } catch (error) {
      console.error("Error: ", {error});
      message.error('Error al actulizar el usuario', 4);
    }
  }

  const formSuccessAgregar = async () => {
    const {
      name,
      email,
      password
    } = userAgregate;

    try {
      const url = `${baseUrl}/api/users`;
      await axios.post(url, {name,email,password})
      setUserAgregate({})
      message.success({ content: 'Se agrego el usuario', duration: 5,
        style: { marginTop: '60px' },
      });
      setIsModal(false);
      getUser()
    } catch (error) {
      console.error("Error: ", {error});
      message.error('Error al actulizar el usuario', 4);
    }
  }  

  const DeleteOrder = async(record) => {
    try {
      const url = `${baseUrl}/api/users/${record.id}`;
      await axios.delete(url)
      message.success({ content: 'Se elimino el usuario, correctamente', duration: 5,
        style: { marginTop: '60px' },
      });
      getUser()
    } catch (error) {
      console.error("Error: ", {error});
      message.error('Error, por favor intentelo de nuevo', 4);
    }
  }

  useEffect(() => {
    getUser()
  }, [])
  
  return (
    <>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <h1 className="">Lista de Usuario</h1>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Button style={{ color: '#000', background:'#04D182', width:'90%', marginTop:'10px', height:'35px'}} onClick={() => AgregateUser()}>
            Crear Usuario
          </Button>
        </Col>
      </Row>
      <Table rowKey={record => record.uid}  columns={tableColumns} dataSource={user} bordered  size="small" />
      <Modal
        title="Editar usuario" 
        open={modalVisible}
        onCancel={ () => (setIsModalVisible(false))}
        footer={null}
      >
        <Form
          id='miformularioReset'
          layout="vertical" 
          onFinish={formSuccessActualizar}
        >
          <Row>
              <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                <Form.Item 
                        name="id" 
                        label="id" 
                        initialValue={userEdit?.id}
                        hasFeedback
                    >
                    <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Form.Item 
                      name='name' 
                      label='Nombre' 
                      initialValue={userEdit?.cliente}
                      hasFeedback
                    >
                      <Input 
                        value={userEdit?.name}
                        onChange={ (e) => {
                          setUserEdit( (pre) => {
                            return { ...pre, name: e.target.value}
                          })
                        }}
                      />
                      <Input style={{ display: 'none'}} />
                  </Form.Item>
                </Col>
            </Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item 
                  name='email' 
                  label='Email' 
                  initialValue={userEdit?.email}
                  hasFeedback
                >
                  <Input
                    value={userEdit?.email}
                    onChange={ (e) => {
                      setUserEdit( (pre) => {
                        return { ...pre, email: e.target.value}
                      })
                    }}
                  />
                  <Input style={{ display: 'none'}} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item>
                <Button htmlType="submit" block
                  style={{ backgroundColor: '#137689', color: '#fff'}}>
                  Actualizar
                </Button>
              </Form.Item>
            </Col>
        </Form>
      </Modal>

      <Modal
        title="Agregar usuario" 
        open={modal}
        onCancel={ () => (setIsModal(false))}
        footer={null}
      >
        <Form
          id='miformularioAgregar'
          layout="vertical" 
          onFinish={formSuccessAgregar}
        >
          <Row>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Form.Item 
                      name='name' 
                      label='Nombre' 
                      hasFeedback
                    >
                      <Input 
                        value={userAgregate?.name}
                        onChange={ (e) => {
                          setUserAgregate( (pre) => {
                            return { ...pre, name: e.target.value}
                          })
                        }}
                      />
                      <Input style={{ display: 'none'}} />
                  </Form.Item>
                </Col>
            </Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item 
                  name='email' 
                  label='Email' 
                  hasFeedback
                >
                  <Input
                    value={userAgregate?.email}
                    onChange={ (e) => {
                      setUserAgregate( (pre) => {
                        return { ...pre, email: e.target.value}
                      })
                    }}
                  />
                  <Input style={{ display: 'none'}} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item 
                  name='password' 
                  label='Contraseña' 
                  hasFeedback
                >
                  <Input
                    value={userAgregate?.password}
                    onChange={ (e) => {
                      setUserAgregate( (pre) => {
                        return { ...pre, password: e.target.value}
                      })
                    }}
                  />
                  <Input style={{ display: 'none'}} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item>
                <Button htmlType="submit" block
                  style={{ backgroundColor: '#137689', color: '#fff'}}
                >
                  Agregar
                </Button>
              </Form.Item>
            </Col>
        </Form>
      </Modal>
    </>
  );
}

export default App;
