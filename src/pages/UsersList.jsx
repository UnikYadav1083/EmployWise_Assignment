import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EditForm from '../components/EditForm';

function UsersList() {

    const [userData, setUserData] = useState([]);
    const [tempuserData, setTempUserData] = useState([]);
    const [pageNo, setPageNo] = useState(1)
    const [showForm, setShowForm] = useState(false);
    const [editUserData, setEditUserData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://reqres.in/api/users?page=${pageNo}`)
            .then((response) => {
                setUserData(response.data.data);
                setTempUserData(response.data.data);
                setTimeout(() => { setIsLoading(false); }, 500);
            }).catch((err) => {
                console.log(err);
            })
    }, [pageNo])

    return (
        <div className='flex flex-col items-center' style={{ backgroundColor: '#2f2f2f' }}>
            {showForm ? <EditForm user={editUserData} setShowForm={setShowForm} /> : <></>}
            {deleteSuccess ? 
                <div className="p-2 my-2 text-green-800 rounded-xl bg-green-50">
                    <span className='font-medium'>Deleted Successfully</span>
                </div> : <></>}

            <div className="relative w-1/2 mt-2">
                <div className="absolute z-2 inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    onChange={(e) => {
                        let search = e.target.value;
                        let updateUserData = tempuserData.filter((i) => {
                            return i.first_name.includes(search) || i.last_name.includes(search) || i.email.includes(search);
                        });
                        setTempUserData(updateUserData);
                        if (search === "") {
                            setTempUserData(userData);
                        }
                    }}
                    type='search' className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search " />
            </div>

            <div className='grid sm:grid-cols-3 grid-cols-1 gap-4 w-[100vw] py-4 px-6'>
                {
                    tempuserData.map((user) => {
                        return (
                            isLoading ? 
                                <div className='flex items-center justify-center sm:w-[30vw] sm:h-[40vh] w-[90vw] h-[30vh]'>
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                </div> :
                                <div key={user.id} className='p-4 border-2 border-black rounded-xl' style={{ backgroundColor: '#add8e6' }}>
                                    <div className='flex justify-between w-full'>
                                        <div onClick={() => { setShowForm(!showForm); setEditUserData(user) }}>
                                            <svg className="w-6 h-6 text-gray-800 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                                                <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <img src={user.avatar} className='rounded-full' />
                                        <div onClick={() => {
                                            axios.delete(`https://reqres.in/api/user/${user.id}`)
                                                .then(response => {
                                                    let updateUserData = userData.filter((i) => i.id != user.id);
                                                    setUserData(updateUserData);
                                                    setTempUserData(updateUserData);
                                                    setDeleteSuccess(true);
                                                    setTimeout(() => { setDeleteSuccess(false) }, 2000);
                                                })
                                                .catch(error => {
                                                    console.error('Error occurred:', error);
                                                });
                                        }}>
                                            <svg className="w-6 h-6 text-gray-800 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='justify-between '>
                                            <div className='p-2'>
                                                FirstName: {user.first_name}
                                            </div>
                                            <div className='p-2'>
                                                LastName: {user.last_name}
                                            </div>
                                        </div>
                                        <div className='flex p-2 text-base'>
                                            <p>Email:  {user.email}</p>
                                        </div>
                                    </div>
                                </div>
                        )
                    })
                }
            </div>

            <nav className='mb-4'>
                <ul className="inline-flex h-10 -space-x-px text-base">
                    <li>
                        <div 
                            onClick={() => { if (pageNo > 1) { setPageNo(pageNo - 1); } }} 
                            className={`flex items-center justify-center h-10 px-4 leading-tight text-gray-500 border border-gray-300 ms-0 border-e-0 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${pageNo > 1 ? 'bg-green-500' : 'bg-white'}`}>
                            Previous
                        </div>
                    </li>
                    <li>
                        <a className="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
                            {pageNo}
                        </a>
                    </li>
                    <li>
                        <div 
                            onClick={() => { if (pageNo < 2) { setPageNo(pageNo + 1); } }} 
                            className={`flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${pageNo < 2 ? 'bg-green-500' : 'bg-white'}`}>
                            Next
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default UsersList;
