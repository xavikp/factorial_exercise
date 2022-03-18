module Api
  module V1
    class EditsController < ApplicationController
      def index
        edits = Edit.all
        render json: EditSerializer.new(edits).serialized_json
      end

      def show
        edit = Edit.first
        render json: EditSerializer.new(edit).serialized_json
      end
    end
  end
end
