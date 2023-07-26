import React from 'react'
import ClassTimetable from '../../components/ClassTimetable/ClassTimetable'
import "./class-page.scss"

function ClassPage() {
  return (
    <div className='class-page'>
      <h2>Class Timetable</h2>
      <ClassTimetable/>
    </div>
  )
}

export default ClassPage