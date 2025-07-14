import { NavBar } from '@/components/ui/ui-custom/navbar'
import { Courses } from '@/pages/courses'
import { Home } from '@/pages/home'
import { Route, Routes } from 'react-router-dom'

export function AppRoutes() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Courses' element={<Courses />} />
                <Route />
            </Routes>
        </>
    )
}