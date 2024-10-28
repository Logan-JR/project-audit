import { connectDB } from "@/libs/database";
import User from "@/models/cpa/User";
import Kardex from "@/models/academic/Kardex";
import Log from "@/models/cpa/Log";
import Curso from "@/models/courses/Curso";
import Inscription from "@/models/courses/Inscription";
import Post from "@/models/cpa/Post";
import Gallery from "@/models/cpa/Gallery";

export const loadUsers = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 10;
  try {
    connectDB();
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (error) {
    console.log(error);
  }
};

export const loadKardexs = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 10;
  try {
    connectDB();
    const count = await Kardex.find({
      "student.ci": { $regex: regex },
    }).count();
    const kardexs = await Kardex.find({ "student.ci": { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, kardexs };
  } catch (error) {
    console.log(error);
  }
};

export const loadLog = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 10;
  try {
    connectDB();
    const count = await Log.find({
      "modifiedByUser.name": { $regex: regex },
    }).count();
    const log = await Log.find({
      "modifiedByUser.name": { $regex: regex },
    })
      .sort({ modifiedDate: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, log };
  } catch (error) {
    console.log(error);
  }
};

export const loadCurso = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 10;
  try {
    connectDB();
    const count = await Curso.find({
      title: { $regex: regex },
    }).count();
    const cursos = await Curso.find({
      title: { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, cursos };
  } catch (error) {
    console.log(error);
  }
};

export const loadInscription = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 10;
  try {
    connectDB();
    const count = await Inscription.find({
      ci: { $regex: regex },
    }).count();
    const inscription = await Inscription.find({
      ci: { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, inscription };
  } catch (error) {
    console.log(error);
  }
};

export const loadPost = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 10;
  try {
    connectDB();
    const count = await Post.find({
      title: { $regex: regex },
    }).count();
    const post = await Post.find({
      title: { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, post };
  } catch (error) {
    console.log(error);
  }
};

export const loadGallery = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 10;
  try {
    connectDB();
    const count = await Gallery.find({
      detail: { $regex: regex },
    }).count();
    const gallery = await Gallery.find({
      detail: { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, gallery };
  } catch (error) {
    console.log(error);
  }
};
