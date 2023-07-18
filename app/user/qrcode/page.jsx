"use client"

import { useSelector, useDispatch, useStore } from "react-redux"
import React, { useEffect, useState } from 'react'
import { getDisposableID } from "@/app/redux/slices/qrcode"
import Image from "next/image"
import  QRCode  from "qrcode.react"

export default function QRCodeComponent() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDisposableID())
    }, [])
    const disposableID = useSelector(state => state.disposableId?.disposableID)
    console.log('disposableID :', disposableID)
    return (
        <div>
            <QRCode value={disposableID} />
        </div>
    )
}