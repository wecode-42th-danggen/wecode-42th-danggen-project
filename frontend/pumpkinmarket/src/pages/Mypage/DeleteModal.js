import React from 'react';

export default function DeleteModal({
  deleteModal,
  postId,
  deleteBtn,
  handleDeletBtn,
}) {
  return (
    <div>
      {deleteModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-1 bg-gray-100/75">
          <div className="bg-white w-64 h-32 rounded-lg flex flex-col justify-center items-center top-1/2 left-1/2 absolute -translate-y-1/2 -translate-x-1/2">
            <p className="pb-5">게시글을 삭제 하시겠습니까?</p>
            <div>
              <button
                type="button"
                className="bg-slate-200 w-16 h-8 rounded mr-5 hover:bg-slate-300"
                onClick={deleteBtn}
              >
                취소
              </button>
              <button
                type="button"
                className="bg-green-500 w-16 h-8 rounded hover:bg-green-600"
                onClick={() => handleDeletBtn(postId)}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
