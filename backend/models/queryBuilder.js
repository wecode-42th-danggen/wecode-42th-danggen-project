class QueryBuilder {
  constructor(postId, title, location) {
    this.whereParams = {
      ...(postId && { postId }),
      ...(title && { title }),
      ...(location && { location }),
    };

    this.whereMapper = {
      postId: this.postFilterBuilder,
      title: this.titleFilterBuilder,
      location: this.locationFilterBuilder,
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

  titleFilterBuilder(title) {
    return `post.title like "%${title}%"`;
  }

  locationFilterBuilder(location) {
    return `post.location like "%${location}%"`;
  }

  buildQuery() {
    return `${this.createWhereClause()}`;
  }
}

module.exports = QueryBuilder;
