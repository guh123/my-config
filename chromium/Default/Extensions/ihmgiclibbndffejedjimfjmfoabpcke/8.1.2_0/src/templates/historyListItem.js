(function (undefined) {

    pl.extend(ke.templates, {
        get historyListItem() {
            return '\
        <div class="history-item-wrap i-<%=id%>" data-id="<%=id%>" data-from="<%=from_lang%>" data-to="<%=to_lang%>">\
          <div class="inner-item-layout">\
            \
            <div class="main-variant-wrap">\
              <div class="selection-sliding-wrap <%=sliding_wrap_visibility%>">\
                <div class="selection-ticker st-<%=id%> <%=selected%>" data-id="<%=id%>">\
                  <div class="box-wrap">\
                    <div class="box b-<%=id%>"></div>\
                  </div>\
                </div>\
              </div>\
              <div class="the-translation">\
                <div class="particle input-particle" data-langfrom="<%=from_lang%>">\
                    <div class="lang lang-from"><%=lang_from%></div>\
                    <div class="text-part"><%=gender_original%><%=input%></div>\
                    <div class="original-ipa ipa"><%=translit_original%></div>\
                    <div class="buttons">\
                      <div class="add-to-pb-button"></div>\
                      <div class="copy-button copy-original"></div>\
                      <div class="listen-selector listen-butt0n lo-<%=id%> listen-original"></div>\
                    </div>\
                </div>\
                <div class="particle main-output-particle" data-langto="<%=to_lang%>">\
                    <div class="lang lang-to"><%=lang_to%></div>\
                    <div class="text-part"><%=gender_translation%><%=main_output%></div>\
                    <div class="translation-ipa ipa"><%=translit_translation%></div>\
                    <div class="buttons">\
                      <div class="copy-button copy-translation"></div>\
                      <div class="listen-selector listen-butt0n lo-<%=id%> listen-translation"></div>\
                    </div>\
                </div>\
              </div>\
              \
              <div class="action-buttons">\
                <div class="ab ab-delete"></div>\
              </div>\
            </div>\
            \
            <div class="variants-wrap<%=collapse_variants%>"><%=variants%></div>\
            \
            <div class="additional-info-wrap">\
              <div class="times-and-sources"><%=sources%></div>\
            </div>\
            \
          </div>\
        </div>\
      ';
        }
    });

})();