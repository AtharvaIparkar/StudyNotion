import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import "video-react/dist/video-react.css"
import { useLocation } from "react-router-dom"
import { BigPlayButton, Player } from "video-react"

import { markLectureAsComplete, getFullDetailsOfCourse } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures, setCompletedLectures } from "../../../slices/viewCourseSlice"
import IconBtn from "../../common/IconBtn"

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const playerRef = useRef(null)
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState([])
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (!courseSectionData.length) return
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`)
      } else {
        // console.log("courseSectionData", courseSectionData)
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        )
        // console.log("filteredData", filteredData)
        const filteredVideoData = filteredData?.[0]?.subSection?.filter(
          (data) => data._id === subSectionId
        )
        // console.log("filteredVideoData", filteredVideoData)
        if (filteredVideoData && filteredVideoData.length > 0) {
          setVideoData(filteredVideoData[0])
          setPreviewSource(courseEntireData?.thumbnail || "")
          setVideoEnded(false)
        } else {
          // Handle case where video data is not found
          console.warn("Video data not found for sectionId:", sectionId, "subSectionId:", subSectionId)
          setVideoData(null)
          setPreviewSource(courseEntireData?.thumbnail || "")
          setVideoEnded(false)
        }
      }
    })()
  }, [courseSectionData, courseEntireData, location.pathname])

  // check if the lecture is the first video of the course
  const isFirstVideo = () => {
    if (!courseSectionData || courseSectionData.length === 0) return false
    
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    if (currentSectionIndx === -1) return false

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ]?.subSection?.findIndex((data) => data._id === subSectionId) || -1

    if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
      return true
    } else {
      return false
    }
  }

  // go to the next video
  const goToNextVideo = () => {
    // console.log(courseSectionData)
    if (!courseSectionData || courseSectionData.length === 0) return

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    if (currentSectionIndx === -1) return

    const noOfSubsections =
      courseSectionData[currentSectionIndx]?.subSection?.length || 0

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ]?.subSection?.findIndex((data) => data._id === subSectionId) || -1

    if (currentSubSectionIndx === -1) return

    // console.log("no of subsections", noOfSubsections)

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx + 1
        ]?._id
      if (nextSubSectionId) {
        navigate(
          `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
        )
      }
    } else {
      const nextSection = courseSectionData[currentSectionIndx + 1]
      if (nextSection && nextSection.subSection && nextSection.subSection.length > 0) {
        const nextSectionId = nextSection._id
        const nextSubSectionId = nextSection.subSection[0]._id
        navigate(
          `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
        )
      }
    }
  }

  // check if the lecture is the last video of the course
  const isLastVideo = () => {
    if (!courseSectionData || courseSectionData.length === 0) return false
    
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    if (currentSectionIndx === -1) return false

    const noOfSubsections =
      courseSectionData[currentSectionIndx]?.subSection?.length || 0

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ]?.subSection?.findIndex((data) => data._id === subSectionId) || -1

    if (currentSubSectionIndx === -1) return false

    if (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    ) {
      return true
    } else {
      return false
    }
  }

  // go to the previous video
  const goToPrevVideo = () => {
    // console.log(courseSectionData)
    if (!courseSectionData || courseSectionData.length === 0) return

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    if (currentSectionIndx === -1) return

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ]?.subSection?.findIndex((data) => data._id === subSectionId) || -1

    if (currentSubSectionIndx === -1) return

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx - 1
        ]?._id
      if (prevSubSectionId) {
        navigate(
          `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
        )
      }
    } else {
      const prevSection = courseSectionData[currentSectionIndx - 1]
      if (prevSection && prevSection.subSection && prevSection.subSection.length > 0) {
        const prevSectionId = prevSection._id
        const prevSubSectionLength = prevSection.subSection.length
        const prevSubSectionId = prevSection.subSection[
          prevSubSectionLength - 1
        ]._id
        navigate(
          `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
        )
      }
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    )
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
      // Refetch course data to get the latest completed lectures
      const courseData = await getFullDetailsOfCourse(courseId, token)
      if (courseData) {
        dispatch(setCompletedLectures(courseData.completedVideos))
      }
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-5 text-white">
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
        >
          <BigPlayButton position="center" />
          {/* Render When Video Ends */}
          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={() => handleLectureCompletion()}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )}
              <IconBtn
                disabled={loading}
                onclick={() => {
                  if (playerRef?.current) {
                    // Restart the video from the beginning and start playing
                    playerRef?.current?.seek(0)
                    playerRef?.current?.load()
                    // Start playing after a short delay to ensure video is loaded
                    setTimeout(() => {
                      playerRef?.current?.play()
                    }, 100)
                    setVideoEnded(false)
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />
              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="blackButton"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  )
}

export default VideoDetails
// video