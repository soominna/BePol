import Post from "../models/post.js";

const EXCEPT_OPTION = { purport: 0, contents: 0, attachments: 0, comments: 0 };

const setSortOptions = async (sortby) => {
    let sortOptions;
    if (sortby === "최신순") {
      sortOptions = { updatedAt: -1 };
    } else if (sortby === "마감임박순") {
      sortOptions = { updatedAt: 1 };
    } else if (sortby === "찬성순") {
      sortOptions = { agrees: -1 };
    } else if (sortby === "반대순") {
      sortOptions = { disagrees: -1 };
    }

    return sortOptions;
}

export const getAllByCategory = async (categoryArr, search, sortby) => {
  const sortOptions = await setSortOptions(sortby);
  const postsList = await Post.find({
    title: {
        $regex: search, // like 검색 수행
    }
  }, EXCEPT_OPTION).sort(sortOptions);

  return Promise.all(
    postsList.map(async post => {
        let posts;
        const { category } = post;
        for (let type of category) {
            for (let category of categoryArr) {
                if (type === category) {
                    posts = await Post.find({
                        category: {
                            $in: type
                        }
                    });
                    console.log(posts);
                }
            }
        }
        // console.log(posts);
        return posts;
    })
  )
};

export const getSearchedTitleBySorting = async (search, sortby) => {

  const sortOptions = await setSortOptions(sortby);

  return Post.find(
    {
      title: {
        $regex: search, // like 검색 수행
      },
    },
    { purport: 0, contents: 0, attachments: 0, comments: 0 }
  ).sort(sortOptions);
};

export const getClosedSearchedTitleBySorting = async (search, sortby) => {
  const posts = [];
  const sortOptions = await setSortOptions(sortby);
  const postsList = await Post.find(
    {
        title: {
            $regex: search, // like 검색 수행
        }
    },
    { purport: 0, contents: 0, attachments: 0, comments: 0 }
  ).sort(sortOptions);

  Promise.all(
    postsList.map(async (post) => {
      const { updatedAt } = post;
      const date = new Date(updatedAt);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      const afterOneMonth = new Date(year, month + 1, day);

      afterOneMonth.getTime() < new Date().getTime() ? posts.push(post) : null;
    })
  );
  return posts;
};
