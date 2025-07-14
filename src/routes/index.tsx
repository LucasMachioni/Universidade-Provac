import { Courses } from '@/pages/courses'
import { Home } from '@/pages/home'
import { Route, Routes } from 'react-router-dom'

export function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Courses' element={<Courses />} />
                <Route />
            </Routes>
        </>
    )
}