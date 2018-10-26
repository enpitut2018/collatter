require 'test_helper'

class CollasControllerTest < ActionDispatch::IntegrationTest
  setup do
    @colla = collas(:one)
  end

  test "should get index" do
    get collas_url
    assert_response :success
  end

  test "should get new" do
    get new_colla_url
    assert_response :success
  end

  test "should create colla" do
    assert_difference('Colla.count') do
      post collas_url, params: { colla: { image: @colla.image, tag_txt: @colla.tag_txt, template_id: @colla.template_id } }
    end

    assert_redirected_to colla_url(Colla.last)
  end

  test "should show colla" do
    get colla_url(@colla)
    assert_response :success
  end

  test "should get edit" do
    get edit_colla_url(@colla)
    assert_response :success
  end

  test "should update colla" do
    patch colla_url(@colla), params: { colla: { image: @colla.image, tag_txt: @colla.tag_txt, template_id: @colla.template_id } }
    assert_redirected_to colla_url(@colla)
  end

  test "should destroy colla" do
    assert_difference('Colla.count', -1) do
      delete colla_url(@colla)
    end

    assert_redirected_to collas_url
  end
end
