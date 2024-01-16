import React, { useState } from 'react';
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { requestLogin, requestRegister } from '../../client/apiRequest';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    // State for storing username and password
    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState('');
    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const [eyeOpen, setEyeOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const [errorRegister, setErrorRegister] = useState('');
    const [email, setEmail] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPasswordRegister, setErrorPasswordRegister] = useState('');
    const [errorFullname, setErrorFullname] = useState('');
    const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
    const [errorAddress, setErrorAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const [isHidden, setIsHidden] = useState(true);


    const hiddenAllError = () => {
        setErrorLogin('')
        setErrorRegister('')
        setErrorUsername('')
        setErrorPassword('')
        setErrorEmail('')
        setErrorPasswordRegister('')
        setErrorFullname('')
        setErrorPhoneNumber('')
        setErrorAddress('')

    }

    const changeEyeOpen = () => {
        setEyeOpen(!eyeOpen)
    }




    const closeAuthForm = () => {
        if (loading) {
            toast.err(`Đang trong quá trình ${isLogin ? "đăng nhập" : "đăng ký"}`)
            return;
        }
        setIsOpen(false)
        if (isOpen) {
            setTimeout(() => {
                if (!isHidden) {
                    setIsHidden(true)
                }
            }, 400)
        }

    }

    const openAuthForm = () => {
        setIsOpen(true)
        setIsHidden(true)
    }
    React.useEffect(() => {
        openAuthForm()

    }, [])

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username.length == 0) {
            setErrorUsername("Email không được để trống")
        }
        if (password.length == 0) {
            setErrorPassword("Password không được để trống")
        }
        if (username != 0 && password != 0) {
            hiddenAllError()
            setLoading(true)
            try {
                const res = await requestLogin({ email: username, password })

                if (res.status != undefined) {
                    alert("Thanh cong")
                } else {
                    setErrorLogin(res.response.data.message)
                }
            } catch (err) {
                toast.error("Có lỗi không mong muốn xảy ra")
            } finally {
                setLoading(false)
            }


        }

    }


    const handleRegister = async (e) => {
        e.preventDefault();

        if (email.length == 0) {
            setErrorEmail("Email không được để trống")
        }
        if (passwordRegister.length == 0) {
            setErrorPasswordRegister("Mật khẩu không được để trống")
        }
        if (fullName.length == 0) {
            setErrorFullname("Họ và tên không được để trống")
        }
        if (phoneNumber.length == 0) {
            setErrorPhoneNumber("Số điện thoại không được để trống")
        }
        if (address.length == 0) {
            setErrorAddress("Địa chỉ không được để trống")
        }
        if (email.length != 0
            && passwordRegister.length != 0
            && fullName.length != 0
            && phoneNumber.length != 0
            && address.length != 0) {
            setLoading(true)

            try {
                const res = await requestRegister({ email, password: passwordRegister, fullName, phoneNumber, address })
                hiddenAllError()
                console.log(res)
                if (res.status != undefined) {
                    setIsLogin(true)
                    toast.success("Đăng ký thành công")
                } else {
                    setErrorRegister(res.response.data.message)
                }
            } catch (error) {
                console.log(error)
                toast.error("Một lỗi không mong muốn xảy ra")
            }
            finally {
                setLoading(false)
            }

        }
    }

    const handleForgetPassword = () => {
        closeAuthForm()
        navigate("/forget-password")
    }

    const notify = (mess) => toast(mess);

    return (
        <div>

            <div className={`${isHidden ? "scale-0" : "scale-100"} fixed z-50 top-0 left-0 right-0 bottom-0 duration-100`}>
                <div className={`bg-black flex justify-center items-center fixed z-30 h-full w-full transform duration-500 ${isOpen ? "opacity-70" : "opacity-0"}`}></div>
            </div>

            <button onClick={() => {
                setIsOpen(true)
                setIsHidden(false)
                setIsLogin(true)
            }}>Đăng nhập</button>

            <button onClick={() => {
                setIsOpen(true)
                setIsHidden(false)
                setIsLogin(false)
            }}>Đăng ký</button>

            <div className={`${isHidden ? "scale-0" : "scale-100"} fixed z-50 top-0 left-0 right-0 bottom-0 duration-100`}>
                <div className={` flex justify-center items-center fixed z-30 h-full w-full transform duration-500`}>
                    <IoMdClose className={`absolute top-4 right-4 z-50 w-8 h-8 text-white opacity-70 hover:opacity-40 ${loading ? "opacity-40" : "cursor-pointer"}`} onClick={closeAuthForm} />
                    <div className={`w-3/4 max-w-3xl bg-white px-6 py-10 z-50 absolute transform duration-1000 ${isOpen ? "scale-100" : "scale-0"} ${isLogin ? "translate-x-0 opacity-100 scale-100" : "translate-x-[-100%] opacity-0 scale-0"}`}>
                        <p className='text-lg text-red-500'>{errorLogin}</p>
                        <h2 className='text-2xl font-semibold text-black mb-2'>ĐĂNG NHẬP</h2>
                        <form className='flex flex-col gap-2 mb-2'>
                            <div>
                                <p className='flex gap-2 text-sm'>Tên tài khoản hoặc địa chỉ email <div className='text-red-400'>*</div></p>
                                <input value={username} onChange={(e) => {
                                    setErrorUsername('')
                                    setErrorLogin("")
                                    setUsername(e.target.value)
                                }} type="text" className='w-full outline-none border border-gray-400 py-2 px-2 text-sm focus:shadow-lg' />
                                <p className='text-sm text-red-500'>{errorUsername}</p>

                            </div>
                            <div>
                                <p className='flex gap-2 text-sm'>Mật khẩu <div className='text-red-400'>*</div></p>
                                <div className='w-full  border border-gray-400 py-2 px-2 text-sm focus:shadow-lg flex items-center'>
                                    <input value={password} onChange={e => {
                                        setErrorLogin("")
                                        setPassword(e.target.value)
                                        setErrorPassword("")
                                    }} type={eyeOpen ? "text" : "password"} className='w-full outline-none' />
                                    {eyeOpen ?
                                        <RiEyeLine onClick={changeEyeOpen} className='text-xl hover:opacity-45 cursor-pointer' />
                                        :
                                        <RiEyeCloseLine onClick={changeEyeOpen} className='text-xl hover:opacity-45 cursor-pointer' />
                                    }
                                </div >
                                <p className='text-sm text-red-500'>{errorPassword}</p>
                            </div>
                            <div className='flex text-sm gap-2'><input type="checkbox" /> Ghi nhớ mật khẩu</div>
                            <button onClick={handleLogin} className='px-1 py-1 bg-red-700 text-white w-36 hover:bg-red-500'>{loading ? "Đăng nhập..." : "Đăng nhập"}</button>
                        </form>
                        <p onClick={handleForgetPassword} className='text-red-500 text-sm hover:text-red-400 cursor-pointer'>Quên mật khẩu?</p>
                        <hr />
                        <div className='flex gap-4 mt-2'>
                            <button className='border flex justify-center gap-2 items-center px-5 w-36 py-1'> <FaFacebook className='text-blue-500' /> Facebook</button>
                            <button className='border flex justify-center gap-2 items-center px-5 w-36 py-1'> <FaGoogle className='' /> Google</button>
                        </div>
                    </div>


                    {/* Đăng ký */}
                    <div className={`w-3/4 max-w-3xl bg-white px-6 py-10 z-40 absolute transform duration-1000 ${isOpen ? "scale-100" : "scale-0"} ${isLogin ? "translate-x-full opacity-0 scale-0" : "translate-x-0 opacity-100 scale-100"}`}>
                        <p className='text-lg text-red-500'>{errorRegister}</p>
                        <h2 className='text-2xl font-semibold text-black mb-2'>ĐĂNG KÝ</h2>
                        <form className='flex flex-col gap-2 mb-2'>
                            <div>
                                <p className='flex gap-2 text-sm'>Email <div className='text-red-400'>*</div></p>
                                <input

                                    disabled={loading}
                                    type="text"
                                    value={email}
                                    onChange={(e) => {
                                        setErrorEmail("")
                                        setErrorRegister("")
                                        setEmail(e.target.value)
                                    }}
                                    className='w-full outline-none border border-gray-400 py-2 px-2 text-sm focus:shadow-lg'
                                />
                                <p className='text-sm text-red-500'>{errorEmail}</p>
                            </div>
                            <div>
                                <p className='flex gap-2 text-sm'>Mật khẩu <div className='text-red-400'>*</div></p>
                                <div className='w-full border border-gray-400 py-2 px-2 text-sm focus:shadow-lg flex items-center'>
                                    <input
                                        disabled={loading}
                                        type={eyeOpen ? "text" : "password"}
                                        value={passwordRegister}
                                        onChange={(e) => {
                                            setErrorRegister("")
                                            setErrorPasswordRegister("")
                                            setPasswordRegister(e.target.value)
                                        }}
                                        className='w-full outline-none'
                                    />
                                    {eyeOpen ?
                                        <RiEyeLine onClick={changeEyeOpen} className='text-xl hover:opacity-45 cursor-pointer' />
                                        :
                                        <RiEyeCloseLine onClick={changeEyeOpen} className='text-xl hover:opacity-45 cursor-pointer' />
                                    }
                                </div >
                                <p className='text-sm text-red-500'>{errorPasswordRegister}</p>

                            </div>
                            <div className='flex gap-4 w-full'>
                                <div className='w-full'>
                                    <p className='flex gap-2 text-sm'>Họ và tên <div className='text-red-400'>*</div></p>
                                    <input
                                        disabled={loading}
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => {
                                            setErrorRegister("")
                                            setErrorFullname("")
                                            setFullName(e.target.value)
                                        }}
                                        className='w-full outline-none border border-gray-400 py-2 px-2 text-sm focus:shadow-lg'
                                    />
                                    <p className='text-sm text-red-500'>{errorFullname}</p>

                                </div>
                                <div className='w-full'>
                                    <p className='flex gap-2 text-sm'>Số điện thoại <div className='text-red-400'>*</div></p>
                                    <input
                                        disabled={loading}
                                        maxLength={12}
                                        type="text"
                                        value={phoneNumber}
                                        onChange={(e) => {
                                            setErrorRegister("")
                                            setErrorPhoneNumber("")
                                            setPhoneNumber(e.target.value)
                                        }}
                                        className='w-full outline-none border border-gray-400 py-2 px-2 text-sm focus:shadow-lg'
                                    />
                                    <p className='text-sm text-red-500'>{errorPhoneNumber}</p>

                                </div>
                            </div>

                            <div>
                                <p className='flex gap-2 text-sm'>Địa chỉ <div className='text-red-400'>*</div></p>
                                <input
                                    disabled={loading}
                                    type="text"
                                    value={address}
                                    onChange={(e) => {
                                        setErrorRegister("")
                                        setErrorAddress("")
                                        setAddress(e.target.value)
                                    }}
                                    className='w-full outline-none border border-gray-400 py-2 px-2 text-sm focus:shadow-lg'
                                />
                                <p className='text-sm text-red-500'>{errorAddress}</p>

                            </div>
                            <button disabled={loading} onClick={handleRegister} className={`px-1 py-1 ${loading ? "bg-red-500 cursor-default" : "bg-red-700 cursor-pointer"}  text-white w-36 hover:bg-red-500'`}>{loading ? "Đăng ký..." : "Đăng ký"}</button>
                        </form>
                        {/* <p className='text-sm cursor-pointer flex gap-2'>Bạn đã có tài khoản? <div className='text-red-500 hover:text-red-400'
                            onClick={() => setIsLogin(!isLogin)}>Đăng nhập</div></p> */}
                    </div>

                    <div className={`rounded-full text-lg 
            text-white w-[100px] h-[100px] absolute bottom-10 flex justify-center
             items-center animate-bounce hover:bg-red-500 z-50 shadow-2xl
             ${loading ? "cursor-default bg-red-500" : "cursor-pointer bg-red-700"}`} onClick={() => {
                            if (loading) {
                                return;
                            }
                            if (isLogin) {
                                setIsLogin(false)
                            } else {
                                setIsLogin(true)
                            }
                            hiddenAllError()

                        }}>
                        {isLogin ? "Đăng ký" : "Đăng nhập"}
                    </div>
                </div>

            </div>

        </div>

    );
};

export default Login;
