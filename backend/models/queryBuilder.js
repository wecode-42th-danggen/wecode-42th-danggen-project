class QueryBuilder {
  constructor({ postId }) {
    this.whereParams = {
      ...(postId && { postId }),
    };

    this.whereMapper = {
      postId: this.postFilterBuilder,
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

  buildQuery() {
    return `${this.createWhereClause()}`;
  }
}

module.exports = QueryBuilder;
