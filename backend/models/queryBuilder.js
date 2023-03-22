class QueryBuilder {
  constructor(postId, keyword) {
    this.whereParams = {
      ...(postId && { postId }),
      ...(keyword && { keyword }),
    };

    this.whereMapper = {
      postId: this.postFilterBuilder,
      keyword: this.keywordFilterBuilder,
    };
  }

  createWhereClause() {
    const whereConditions = Object.entries(this.whereParams).map(
      ([key, value]) => {
        return this.whereMapper[key](value);
      }
    );

    return whereConditions.length !== 0
      ? `WHERE ${whereConditions.join(' AND ')}`
      : '';
  }

  postFilterBuilder(postId) {
    return `post.id = ${postId}`;
  }

  keywordFilterBuilder(keyword) {
    return `post.title like "%${keyword}%" OR post.location like "%${keyword}%"`;
  }

  buildQuery() {
    return `${this.createWhereClause()}`;
  }
}

module.exports = QueryBuilder;
