"use client";

import { useSyncExternalStore } from "react";
import { getBanglaDate } from "@/lib/helpers";

function subscribe() {
  return function () {};
}

function getClientDate() {
  return getBanglaDate();
}

function getServerDate() {
  return "আজকের তারিখ";
}

export default function TodayDate() {
  const dateText = useSyncExternalStore(subscribe, getClientDate, getServerDate);

  return <span>{dateText}</span>;
}