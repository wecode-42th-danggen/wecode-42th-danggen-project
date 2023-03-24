const { appDataSource } = require('../../models/');

const getCmpost = async () => {
  const result = await appDataSource.query(
    `
    SELECT
      cp.id,
      cp.user_Id AS userId,
      u.social_id AS soialId,
      u.email,
      cp.title,
      cp.image_url AS imageUrl,
      cp.description,
      cp.view_count AS viewCount,
      cp.category_id AS categoryId,
      cc.name AS categortName,
      cp.created_at AS createPost,
      cp.updated_at AS updatePost
    FROM
      community_posts cp
    INNER JOIN
      community_categories cc
    ON
      cp.category_id = cc.id
    LEFT JOIN
      users u
    ON cp.user_id = u.id
    `
  );
  return result;
};

const deleteCmpost = async (cmpostId) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    await queryRunner.query(
      `
      DELETE FROM
        community_comments
      WHERE
        community_post_id=?
      `,
      [cmpostId]
    );

    await queryRunner.query(
      `
      DELETE FROM
        community_posts
      WHERE
        id=?
      `,
      [cmpostId]
    );
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
};

// const deleteCmpost = async(cmpostId)=>{
//   const result = await appDataSource.query(
//     `
//     DELETE FROM
//       community_posts
//     WHERE
//       id=?
//     `,
//     [cmpostId]
//   );
//   return result;
// }

const checkRegistCmpostId = async (cmpostId) => {
  const [result] = await appDataSource.query(
    `
    SELECT EXISTS(
    SELECT
      cp.id
    FROM
      community_posts cp
    WHERE
      cp.id =?
    )as register`,
    [cmpostId]
  );
  return !!parseInt(result.register);
};

module.exports = { getCmpost, deleteCmpost, checkRegistCmpostId };
