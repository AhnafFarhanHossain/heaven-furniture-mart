"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

CustomEase.create("bounce", "0.34, 1.56, 0.64, 1");
CustomEase.create("quick", "0.25, 1, 0.5, 1");
CustomEase.create("textEs", "0.22, 1, 0.36, 1");
CustomEase.create("imgSE", "0.83, 0, 0.17, 1");

export default gsap;